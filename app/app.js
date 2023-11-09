// Here we use application middlewares

const express = require('express');
const morgan = require('morgan');

const {
  globalErrorHandler,
  notFoundErrorHandler,
} = require('../middlewares/globalErrorHandler.js');

const adminRouter = require('../routes/staff/adminRouter.js');
const academicYearRouter = require('../routes/academic/academicYear.js');
const academicTermRouter = require('../routes/academic/academicTerm.js');
const classLevelRouter = require('../routes/academic/classLevel.js');
const app = express();

// Middleware configuration
app.use(morgan('dev'));
app.use(express.json()); // pass incoming data.

//Routes
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/academic-years', academicYearRouter);
app.use('/api/v1/academic-terms', academicTermRouter);
app.use('/api/v1/class-levels', classLevelRouter);

// Error Handlers Middleware
app.use(notFoundErrorHandler);
app.use(globalErrorHandler);

module.exports = app;
