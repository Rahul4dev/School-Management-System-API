const AsyncHandler = require('express-async-handler');
const Question = require('../../model/Academic/Question.js');
const Teacher = require('../../model/staff/Teacher.js');
const Exam = require('../../model/Academic/Exam.js');

const isTeacher = require('../../middlewares/isTeacher.js');
const isTeacherLoggedIn = require('../../middlewares/isTeacherLoggedIn.js');

//@desc Create Question
//@route GET /api/v1/questions/:examId
//@access Private Teacher Only

exports.createQuestion = AsyncHandler(async (req, res) => {
  const {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    isCorrect,
  } = req.body;

  // find Exam
  const examFound = await Exam.findById(req.params.examId);
  if (!examFound) throw new Error('No exam found');

  // Check if question exists
  const questionExists = await Question.findOne({ question });
  if (questionExists) throw new Error(`${question} already exists`);

  // create Exam
  const questionCreated = await Question.create({
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    isCorrect,
    correctAnswer,
    createdBy: req.userAuth._id,
  });

  // add Question to Exam
  examFound.questions.push(questionCreated?._id);

  // save
  await examFound.save();
  // send response
  res.status(201).json({
    status: 'success',
    data: questionCreated,
    message: 'Question Created Successfully!',
  });
});

//@desc Get All Questions
//@route GET /api/v1/questions
//@access Private Teacher Only
exports.getAllQuestions = AsyncHandler(async (req, res) => {
  const questions = await Question.find();
  if (!questions) throw new Error('No question found!');

  res.status(200).json({
    status: 'success',
    message: 'Questions fetched successfully',
    data: questions,
  });
});

//@desc Get single Question
//@route GET /api/v1/Questions/:id
//@access Private
exports.getSingleQuestion = AsyncHandler(async (req, res) => {
  const questionFound = await Question.findById(req.params.id);
  if (!questionFound)
    throw new Error('There is no such Question, please try again!');

  res.status(200).json({
    status: 'success',
    message: 'Question fetched successfully',
    data: questionFound,
  });
});

//@desc Update single Question
//@route PUT /api/v1/questions/:id
//@access Private Teacher only
exports.updateQuestion = AsyncHandler(async (req, res) => {
  const {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    isCorrect,
    correctAnswer,
  } = req.body;
  // if question exists
  const questionFound = await Question.findOne({ question });
  if (questionFound) throw new Error(`${question} already exists`);

  const updatedQuestion = await Question.findByIdAndUpdate(
    req.params.id,
    {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      isCorrect,
      correctAnswer,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: 'success',
    message: 'Question updated successfully',
    data: updatedQuestion,
  });
});

//@desc Delete Question
//@route DELETE /api/v1/questions/:id
//@access Private
exports.deleteQuestion = AsyncHandler(async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Question Deleted successfully',
  });
});
