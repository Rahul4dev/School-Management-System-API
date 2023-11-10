const express = require('express');

const subjectRouter = express.Router();

// Controllers
const {
  createSubject,
  getAllSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
} = require('../../controller/academics/subjectCtrl.js');

// Middlewares
const isAdmin = require('../../middlewares/isAdmin.js');
const isLoggedIn = require('../../middlewares/isLoggedIn.js');

// Routes
// academicYearRouter.post('/', isLoggedIn, isAdmin, createAcademicYear);
// academicYearRouter.get('/', isLoggedIn, isAdmin, getAllAcademicYears);

subjectRouter.post('/:programId', isLoggedIn, isAdmin, createSubject);

subjectRouter.get('/', isLoggedIn, isAdmin, getAllSubjects);

subjectRouter.get('/:id', isLoggedIn, isAdmin, getSingleSubject);
subjectRouter.put('/:id', isLoggedIn, isAdmin, updateSubject);
subjectRouter.delete('/:id', isLoggedIn, isAdmin, deleteSubject);

module.exports = subjectRouter;
