const AsyncHandler = require('express-async-handler');
const Exam = require('../../model/Academic/Exam');
const Teacher = require('../../model/staff/Teacher');

//@desc Create Exam
//@route GET /api/v1/exams
//@access Private Teachers Only

exports.createExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    classLevel,
    examDate,
    examTime,
    examType,
    createdBy,
    academicYear,
  } = req.body;

  // find Teacher
  const teacherFound = await Teacher.findById(req.userAuth?._id);
  if (!teacherFound) {
    throw new Error('Teacher not found');
  }

  // Exam Exists
  const examExists = await Exam.findOne({ name });
  if (examExists) {
    throw new Error('Exam already Exists');
  }

  // Create Exam
  const examCreated = new Exam({
    name,
    description,
    academicTerm,
    academicYear,
    classLevel,
    createdBy: req.userAuth?._id,
    duration,
    examDate,
    examTime,
    examType,
    subject,
    program,
  });

  // push the exam into teacher
  teacherFound.examsCreated.push(examCreated._id);

  // save exam
  await examCreated.save();
  await teacherFound.save();

  res.status(201).json({
    status: 'success',
    message: ' Exam created successfully',
    data: examCreated,
  });
});

//@desc Get All Exams
//@route GET /api/v1/exams
//@access Private
exports.getAllExams = AsyncHandler(async (req, res) => {
  const exams = await Exam.find().populate({
    path: 'questions',
    populate: {
      path: 'createdBy',
    },
  });
  if (!exams) throw new Error('No subject found, please create a new one!');

  res.status(200).json({
    status: 'success',
    message: 'Exams fetched successfully',
    data: exams,
  });
});

//@desc Get single Exam
//@route GET /api/v1/exams/:id
//@access Private
exports.getSingleExam = AsyncHandler(async (req, res) => {
  const examFound = await Exam.findById(req.params.id);
  if (!examFound) throw new Error('There is no such Exam, please try again!');

  res.status(200).json({
    status: 'success',
    message: 'Exam fetched successfully',
    data: examFound,
  });
});

//@desc Update single Exam
//@route PUT /api/v1/exams/:id
//@access Private Teacher only
exports.updateExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    classLevel,
    examDate,
    examTime,
    examType,
    createdBy,
    academicYear,
  } = req.body;
  // if name exists
  const examFound = await Exam.findOne({ name });
  if (examFound) throw new Error(`${name} already exists`);
  const updatedExam = await Exam.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      subject,
      program,
      academicTerm,
      duration,
      classLevel,
      examDate,
      examTime,
      examType,
      academicYear,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: 'success',
    message: 'Exam updated successfully',
    data: updatedExam,
  });
});

//@desc Delete Exam
//@route DELETE /api/v1/exams/:id
//@access Private
exports.deleteExam = AsyncHandler(async (req, res) => {
  await Exam.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Exam Deleted successfully',
  });
});
