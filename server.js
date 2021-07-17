const path = require('path');
const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
var mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const mongoSanitize = require('express-mongo-sanitize');


// Load env vars
dotenv.config({ path: './config/config.env' });


const app = express();


// Connect to database
connectDB();

// Body parser init middleware
app.use(express.json({ extended: false }));

app.use(bodyParser.json());

// Cookie parser
app.use(cookieParser());

// Route files

const employees = require('./routes/employees');
const user = require('./routes/user');
const auth = require('./routes/auth');



// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(mongoSanitize());



// Mount routers
app.use('/api/v1/employees', employees);
app.use('/api/v1/user', user);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    // server.close(() => process.exit(1));
});