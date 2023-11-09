const express = require('express');

const academicTermRouter = express.Router();

// Controllers
const {
  createAcademicTerm,
  getAllAcademicTerms,
  getSingleAcademicTerm,
  updateAcademicTerm,
  deleteAcademicTerm,
} = require('../../controller/academics/academicTermCtrl.js');

// Middlewares
const isAdmin = require('../../middlewares/isAdmin.js');
const isLoggedIn = require('../../middlewares/isLoggedIn.js');

// Routes

academicTermRouter
  .route('/')
  .post(isLoggedIn, isAdmin, createAcademicTerm)
  .get(isLoggedIn, isAdmin, getAllAcademicTerms);

academicTermRouter
  .route('/:id')
  .get(isLoggedIn, isAdmin, getSingleAcademicTerm)
  .put(isLoggedIn, isAdmin, updateAcademicTerm)
  .delete(isLoggedIn, isAdmin, deleteAcademicTerm);

module.exports = academicTermRouter;
