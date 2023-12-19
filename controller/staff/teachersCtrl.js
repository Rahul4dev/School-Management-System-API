const AsyncHandler = require('express-async-handler');
const Teacher = require('../../model/staff/Teacher');
const { hashPassword, isPasswordMatched } = require('../../utils/helpers');
const generateToken = require('../../utils/generateToken');

//@desc Admin Register new Teacher
//@route POST /api/v1/teachers/admin/register
//@access Private

exports.adminRegisterTeacher = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // check if teacher is already registered
  const teacherExists = await Teacher.findOne({ email });
  if (teacherExists) {
    throw new Error(`Teacher ${name} already employed`);
  }

  // hash password
  const hashedPassword = await hashPassword(password);

  // register teacher
  const teacherCreated = await Teacher.create({
    name,
    email,
    password: hashedPassword,
  });

  // send teacher data and response
  res.status(201).json({
    status: 'success',
    message: `Teacher ${name} registered successfully`,
    data: teacherCreated,
  });
});

//@desc Get: all Teachers
//@route /api/v1/teachers/
//@access Private
exports.getAllTeachers = AsyncHandler(async (req, res) => {
  const teachers = await Teacher.find();
  res.status(200).json({
    status: 'success',
    message: 'Teachers fetched successfully',
    data: teachers,
  });
});

//@desc POST: Login Teacher
//@route /api/v1/teachers/login
//@access Public
exports.teacherLoginCtrl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // find teacher
  const teacher = await Teacher.findOne({ email });
  if (!teacher) return res.json({ message: 'Invalid Login credentials' });

  // verify password
  const isMatched = await isPasswordMatched(password, teacher?.password);

  if (!isMatched) return res.json({ message: 'Invalid Login credentials' });
  else {
    return res.json({
      data: generateToken(teacher?._id),
      message: 'Teacher logged in successfully!',
    });
  }
});

//@desc Get: Single Teacher Profile
//@route /api/v1/teachers/:id
//@access Private
exports.getTeacherProfileCtrl = AsyncHandler(async (req, res) => {
  const user = req.userAuth;
  const teacher = await Teacher.findById(user._id).select(
    '-password -createdAt -updatedAt'
  );
  if (!teacher) throw new Error('Teacher not found');
  else {
    res.status(200).json({
      status: 'OK',
      message: 'Teacher profile fetched successfully',
      data: teacher,
    });
  }
});
