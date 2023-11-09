const express = require('express');

const academicYearRouter = express.Router();

// Controllers
const {
  createAcademicYear,
  getAllAcademicYears,
  getSingleAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
} = require('../../controller/academics/academicYearCtrl.js');

// Middlewares
const isAdmin = require('../../middlewares/isAdmin.js');
const isLoggedIn = require('../../middlewares/isLoggedIn.js');

// Routes
// academicYearRouter.post('/', isLoggedIn, isAdmin, createAcademicYear);
// academicYearRouter.get('/', isLoggedIn, isAdmin, getAllAcademicYears);

academicYearRouter
  .route('/')
  .post(isLoggedIn, isAdmin, createAcademicYear)
  .get(isLoggedIn, isAdmin, getAllAcademicYears);

// academicYearRouter.get('/:id', isLoggedIn, isAdmin, getSingleAcademicYear);
// academicYearRouter.put('/:id', isLoggedIn, isAdmin, updateAcademicYear);
// academicYearRouter.delete('/:id', isLoggedIn, isAdmin, deleteAcademicYear);

academicYearRouter
  .route('/:id')
  .get(isLoggedIn, isAdmin, getSingleAcademicYear)
  .put(isLoggedIn, isAdmin, updateAcademicYear)
  .delete(isLoggedIn, isAdmin, deleteAcademicYear);

module.exports = academicYearRouter;
