const express = require('express');
const teachersRouter = express.Router();

// Controllers
const {
  adminRegisterTeacher,
  getAllTeachers,
  getTeacherProfileCtrl,
  teacherLoginCtrl,
} = require('../../controller/staff/teachersCtrl');

// utils
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');

// Routes

// Register Teacher by the Admin
teachersRouter.post(
  '/admin/register',
  isLoggedIn,
  isAdmin,
  adminRegisterTeacher
);

// Get All Teachers
teachersRouter.get('/', isLoggedIn, isAdmin, getAllTeachers);

// Teacher Login
teachersRouter.post('/login', teacherLoginCtrl);

// get teacher profile by Id
teachersRouter.get('/profile', isLoggedIn, isAdmin, getTeacherProfileCtrl);

module.exports = teachersRouter;
