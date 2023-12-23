const express = require('express');
const isTeacher = require('../../middlewares/isTeacher.js');
const isTeacherLoggedIn = require('../../middlewares/isTeacherLoggedIn.js');

const {
  createExam,
  getAllExams,
  getSingleExam,
  updateExam,
  deleteExam,
} = require('../../controller/academics/examCtrl.js');

const examRouter = express.Router();

// Teachers Only Routes
examRouter
  .route('/')
  .post(isTeacherLoggedIn, isTeacher, createExam)
  .get(isTeacherLoggedIn, isTeacher, getAllExams);

examRouter
  .route('/:id')
  .get(isTeacherLoggedIn, isTeacher, getSingleExam)
  .put(isTeacherLoggedIn, isTeacher, updateExam)
  .delete(isTeacherLoggedIn, isTeacher, deleteExam);

module.exports = examRouter;
