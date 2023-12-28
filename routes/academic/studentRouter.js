const express = require('express');

// Controllers
const {
  adminRegisterStudent,
  studentLoginCtrl,
  getAllStudents,
  getStudentProfileCtrl,
  getStudentByAdmin,
  updateStudentCtrl,
  adminUpdateStudentCtrl,
} = require('../../controller/academics/studentCtrl.js');

// utils
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');
const isTeacher = require('../../middlewares/isTeacher.js');
const isTeacherLoggedIn = require('../../middlewares/isTeacherLoggedIn');
const isStudentLoggedIn = require('../../middlewares/isStudentLoggedIn');
const isStudent = require('../../middlewares/isStudent.js');

const studentRouter = express.Router();
// Routes

// Register Student by the Admin
studentRouter.post(
  '/admin/register',
  isLoggedIn,
  isAdmin,
  adminRegisterStudent
);

// Student login
studentRouter.post('/login', studentLoginCtrl);

// Get All Student by Teacher
studentRouter.get(
  '/',
  isTeacherLoggedIn || isLoggedIn,
  isTeacher,
  getAllStudents
);

// get Student profile by Student Only
studentRouter.get(
  '/profile',
  isStudentLoggedIn,
  isStudent,
  getStudentProfileCtrl
);

// get Student profile by Admin through studentId
studentRouter.get('/:studentId/admin', isLoggedIn, isAdmin, getStudentByAdmin);

// update student profile by student only
studentRouter.put('/update', isStudentLoggedIn, isStudent, updateStudentCtrl);

// update student by Admin
studentRouter.put(
  '/:studentId/update/admin',
  isLoggedIn,
  isAdmin,
  adminUpdateStudentCtrl
);

module.exports = studentRouter;
