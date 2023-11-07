// Here we use application middlewares

const express = require('express');
const morgan = require('morgan');

const adminRouter = require('../routes/staff/adminRouter.js');
const app = express();

// Middleware configuration
app.use(morgan('dev'));
app.use(express.json()); // pass incoming data.

//Routes
app.use('/api/v1/admins', adminRouter);

module.exports = app;
