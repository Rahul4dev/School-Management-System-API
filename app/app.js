// Here we use application middlewares

const express = require('express');
const morgan = require('morgan');

const {
  globalErrorHandler,
  notFoundErrorHandler,
} = require('../middlewares/globalErrorHandler.js');

const adminRouter = require('../routes/staff/adminRouter.js');
const teachersRouter = require('../routes/staff/teacherRouter.js');

const academicYearRouter = require('../routes/academic/academicYear.js');
const academicTermRouter = require('../routes/academic/academicTerm.js');
const classLevelRouter = require('../routes/academic/classLevel.js');
const programRouter = require('../routes/academic/program.js');
const subjectRouter = require('../routes/academic/subject.js');
const yearGroupRouter = require('../routes/academic/yearGroup.js');

const app = express();

// Middleware configuration
app.use(morgan('dev'));
app.use(express.json()); // pass incoming data.

//Routes
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/teachers', teachersRouter);

app.use('/api/v1/academic-years', academicYearRouter);
app.use('/api/v1/academic-terms', academicTermRouter);
app.use('/api/v1/class-levels', classLevelRouter);
app.use('/api/v1/programs', programRouter);
app.use('/api/v1/subjects', subjectRouter);
app.use('/api/v1/year-groups', yearGroupRouter);

// Error Handlers Middleware
app.use(notFoundErrorHandler);
app.use(globalErrorHandler);

module.exports = app;
