const csv = require("fast-csv");
const Employee = require('../models/Employee');
const ErrorResponse = require('../utils/errorResponse');
const auth = require('../middleware/auth');
const asyncHandler = require('../middleware/async');


// @desc      Import employee data from csv
// @access    Public

module.exports.employee = {
    importEmployeeData: function () {
        csv.parseFile(__dirname + '/' + 'data.csv', { headers: true })
            .on("data", function (data) {
                console.log(data);
                //Removes spaces from property value in-case it does have
                for (var key in data) {
                    data[key] = data[key].trim();
                }
                //Create a employee Object and assign all values for it to save in mongo database
                var employee = new Employee({
                    employeeCode: data['Employee Code'],
                    firstName: data['First Name'],
                    lastName: data['Last Name'],
                    email: data['email'],
                    jobTitle: data['Job Title'],
                    department: data['Department'],
                    location: data['Location'],
                    dateHired: data['Date Hired']
                });
                //save in database
                employee.save(function (err) {
                    if (err) {
                        console.log("There is an error in processing employee data: " + err);
                    } else {
                        console.log("Employee data has been saved: " + data);
                    }
                })
            })
            .on("error", function (error) {
                console.log("There is an error in processing: " + error);
            })
            .on("end", function () {
                console.log("done");
            });

    }
}

// @desc      Create new employee
// @route     POST /api/v1/employee
// @access    Public

exports.createEmployee = asyncHandler(async (req, res, next) => {

    const employee = await Employee.create(req.body);

    res.status(201).json({
        success: true,
        data: employee
    });
});


// @desc      Update a employee
// @route     POST /api/v1/employee/:id
// @access    Private

exports.updateEmployee = asyncHandler(async (req, res, next) => {
    let employee = await Employee.findById(req.params.id);

    if (!employee) {
        return next(
            new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404)
        );
    }

    employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, data: employee });
});


// @desc      Get All employee
// @route     POST /api/v1/employee
// @access    Private

exports.getAllemployees = asyncHandler(async (req, res, next) => {
    const employee = await Employee.find()
    res.status(200).json(employee);
    next();
});


// @desc      Get a single employee data
// @route     POST /api/v1/employee/:id
// @access    Private 

exports.getEmployee = asyncHandler(async (req, res, next) => {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
        return next(
            new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({ success: true, data: employee });
});

// exports.getEmployee = async (req, res) => {
//     try {
//         const employee = await Employee.findById(req.params.id);

//         if (!employee) {
//             return res.status(404).json({ msg: 'Employee not found' });
//         }

//         res.json(employee);
//     } catch (err) {
//         console.error(err.message);
//         if (err.kind === 'ObjectId') {
//             return res.status(404).json({ msg: 'Employee not found' });
//         }
//         res.status(500).send('Server Error');
//     }
// };


// @desc      Delete a employee
// @route     POST /api/v1/employee/:id
// @access    Private

exports.deleteEmployee = asyncHandler(async (req, res, next) => {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
        return next(
            new ErrorResponse(`employee not found with id of ${req.params.id}`, 404)
        );
    }
    await employee.remove();

    res.status(200).json({ success: true, data: {} });
});