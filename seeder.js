const path = require('path');
const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
var mongoose = require('mongoose');


// Load env vars
dotenv.config({ path: './config/config.env' });


const app = express();

// Connect to database
connectDB();


// Route files for pushing data in mongodb collection
var employees = require('./controllers/employees');
employees.employee.importEmployeeData();


// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}




const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
);