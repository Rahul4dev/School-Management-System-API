const express = require('express');

const yearGroupRouter = express.Router();

// Controllers
const {
  createYearGroup,
  getAllYearGroups,
  getSingleYearGroup,
  updateYearGroup,
  deleteYearGroup,
} = require('../../controller/academics/yearGroupCtrl.js');

// Middlewares
const isAdmin = require('../../middlewares/isAdmin.js');
const isLoggedIn = require('../../middlewares/isLoggedIn.js');

// Routes

yearGroupRouter
  .route('/')
  .post(isLoggedIn, isAdmin, createYearGroup)
  .get(isLoggedIn, isAdmin, getAllYearGroups);

yearGroupRouter
  .route('/:id')
  .get(isLoggedIn, isAdmin, getSingleYearGroup)
  .put(isLoggedIn, isAdmin, updateYearGroup)
  .delete(isLoggedIn, isAdmin, deleteYearGroup);

module.exports = yearGroupRouter;
