// Here we use application middlewares

const express = require('express');
const morgan = require('morgan');

const {
  globalErrorHandler,
  notFoundErrorHandler,
} = require('../middlewares/globalErrorHandler.js');

const adminRouter = require('../routes/staff/adminRouter.js');
const academicYearRouter = require('../routes/academic/academicYear.js');
const app = express();

// Middleware configuration
app.use(morgan('dev'));
app.use(express.json()); // pass incoming data.

//Routes
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/academic-years', academicYearRouter);

// Error Handlers Middleware
app.use(notFoundErrorHandler);
app.use(globalErrorHandler);

module.exports = app;
