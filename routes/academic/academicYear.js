const express = require('express');

const academicYearRouter = express.Router();

// Controllers
const {
  createAcademicYear,
  getAllAcademicYears,
  getSingleAcademicYear,
} = require('../../controller/academics/academicYearCtrl.js');

// Middlewares
const isAdmin = require('../../middlewares/isAdmin.js');
const isLoggedIn = require('../../middlewares/isLoggedIn.js');

// Routes
academicYearRouter.post('/', isLoggedIn, isAdmin, createAcademicYear);
academicYearRouter.get('/', isLoggedIn, isAdmin, getAllAcademicYears);
academicYearRouter.get('/:id', isLoggedIn, isAdmin, getSingleAcademicYear);

module.exports = academicYearRouter;
