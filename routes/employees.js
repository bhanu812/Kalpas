const express = require('express');
const auth = require('../middleware/auth');

const {
    getAllemployees, getEmployee, deleteEmployee, createEmployee, updateEmployee
} = require('../controllers/employees');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .post(createEmployee);

router
    .route('/:id')
    .put(auth, updateEmployee);


router
    .route('/')
    .get(auth, getAllemployees);

router
    .route('/:id')
    .get(auth, getEmployee);

router
    .route('/:id')
    .delete(auth, deleteEmployee);

module.exports = router;