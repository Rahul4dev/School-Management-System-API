const express = require('express');

const academicYearRouter = express.Router();

// Controllers
const {
  createAcademicYear,
} = require('../../controller/academics/academicYearCtrl.js');

// Middlewares
const isAdmin = require('../../middlewares/isAdmin.js');
const isLoggedIn = require('../../middlewares/isLoggedIn.js');

// Routes
academicYearRouter.post('/', isLoggedIn, isAdmin, createAcademicYear);

module.exports = academicYearRouter;
