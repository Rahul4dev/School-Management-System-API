const express = require('express');

const programRouter = express.Router();

// Controllers
const {
  createProgram,
  getAllPrograms,
  getSingleProgram,
  updateProgram,
  deleteProgram,
} = require('../../controller/academics/programCtrl.js');

// Middlewares
const isAdmin = require('../../middlewares/isAdmin.js');
const isLoggedIn = require('../../middlewares/isLoggedIn.js');

// Routes

programRouter
  .route('/')
  .post(isLoggedIn, isAdmin, createProgram)
  .get(isLoggedIn, isAdmin, getAllPrograms);

programRouter
  .route('/:id')
  .get(isLoggedIn, isAdmin, getSingleProgram)
  .put(isLoggedIn, isAdmin, updateProgram)
  .delete(isLoggedIn, isAdmin, deleteProgram);

module.exports = programRouter;
