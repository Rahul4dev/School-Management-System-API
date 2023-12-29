const express = require('express');
const isTeacher = require('../../middlewares/isTeacher.js');
const isTeacherLoggedIn = require('../../middlewares/isTeacherLoggedIn.js');
const {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
} = require('../../controller/academics/questionCtrl');

const questionsRouter = express.Router();

questionsRouter.get('/', isTeacherLoggedIn, isTeacher, getAllQuestions);
questionsRouter.get('/:id', isTeacherLoggedIn, isTeacher, getSingleQuestion);
questionsRouter.put('/:id', isTeacherLoggedIn, isTeacher, updateQuestion);
questionsRouter.delete('/:id', isTeacherLoggedIn, isTeacher, deleteQuestion);
questionsRouter.post('/:examId', isTeacherLoggedIn, isTeacher, createQuestion);

module.exports = questionsRouter;
