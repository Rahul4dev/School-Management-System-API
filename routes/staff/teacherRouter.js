const express = require('express');
const teachersRouter = express.Router();

// Controllers
const {
  adminRegisterTeacher,
  getAllTeachers,
  getTeacherProfileCtrl,
  getTeacherByAdmin,
  teacherLoginCtrl,
  updateTeacherCtrl,
  adminUpdateTeacherCtrl,
} = require('../../controller/staff/teachersCtrl');

// utils
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isTeacherLoggedIn = require('../../middlewares/isTeacherLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');
const isTeacher = require('../../middlewares/isTeacher');

// Routes

// Register Teacher by the Admin
teachersRouter.post(
  '/admin/register',
  isLoggedIn,
  isAdmin,
  adminRegisterTeacher
);

// Get All Teachers by Admin
teachersRouter.get('/', isLoggedIn, isAdmin, getAllTeachers);

// Teacher Login
teachersRouter.post('/login', teacherLoginCtrl);

// get teacher profile
teachersRouter.get(
  '/profile',
  isTeacherLoggedIn,
  isTeacher,
  getTeacherProfileCtrl
);

// update teacher profile by teacher
teachersRouter.put(
  '/:teacherId/update',
  isTeacherLoggedIn,
  isTeacher,
  updateTeacherCtrl
);

// update teacher by Admin
teachersRouter.put(
  '/:teacherId/update/admin',
  isLoggedIn,
  isAdmin,
  adminUpdateTeacherCtrl
);

// get teacher profile by Id
teachersRouter.get('/:teacherId/admin', isLoggedIn, isAdmin, getTeacherByAdmin);

module.exports = teachersRouter;
