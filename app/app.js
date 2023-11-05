// Here we use application middlewares

const express = require('express');
const morgan = require('morgan');

const app = express();

// Middleware configuration
app.use(morgan('dev'));

module.exports = app;
