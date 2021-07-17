var mongoose = require('mongoose');
var EmployeeSchema = new mongoose.Schema({
    employeeCode: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
    jobTitle: String,
    department: String,
    location: String,
    dateHired: { type: Date, Default: Date.now() }

});

module.exports = mongoose.model('Employee', EmployeeSchema);