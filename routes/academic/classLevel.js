const express = require('express');

const classLevelRouter = express.Router();

// Controllers
const {
  createClassLevel,
  getAllClassLevels,
  getSingleClassLevel,
  updateClassLevel,
  deleteClassLevel,
} = require('../../controller/academics/classLevelCtrl.js');

// Middlewares
const isAdmin = require('../../middlewares/isAdmin.js');
const isLoggedIn = require('../../middlewares/isLoggedIn.js');

// Routes

classLevelRouter
  .route('/')
  .post(isLoggedIn, isAdmin, createClassLevel)
  .get(isLoggedIn, isAdmin, getAllClassLevels);

classLevelRouter
  .route('/:id')
  .get(isLoggedIn, isAdmin, getSingleClassLevel)
  .put(isLoggedIn, isAdmin, updateClassLevel)
  .delete(isLoggedIn, isAdmin, deleteClassLevel);

module.exports = classLevelRouter;
