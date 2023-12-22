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

//@desc Get: all Teachers by Admin
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

//@desc Get: Single Teacher by Admin
//@route /api/v1/teachers/:teacherId/admin
//@access Private
exports.getTeacherByAdmin = AsyncHandler(async (req, res) => {
  const teacherId = req.params.teacherId;
  const teacher = await Teacher.findById(teacherId);

  if (!teacher) throw new Error('Teacher not found');
  else {
    res.status(200).json({
      status: 'OK',
      message: 'Teacher detail fetched successfully',
      data: teacher,
    });
  }
});

//@desc Get: Single Teacher Profile
//@route /api/v1/teachers/profile
//@access Private Teacher Only
exports.getTeacherProfileCtrl = AsyncHandler(async (req, res) => {
  const teacherId = req.userAuth?._id;
  const teacher = await Teacher.findById(teacherId).select(
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

//@desc PUT: Update Teacher by Teacher
//@route /api/v1/teachers/:teacherId/update
//@access Private Teacher Only
exports.updateTeacherCtrl = AsyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  // if email exists,
  const emailExist = await Teacher.findOne({ email });
  if (emailExist) throw new Error('Email is already taken');

  // check if user updating the password
  if (password) {
    // update password along with email, name and hashed password
    const teacher = await Teacher.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        name,
        password: await hashPassword(password),
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      message: 'Teacher updated successfully',
      data: teacher,
    });
  } else {
    // update
    const teacher = await Teacher.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      message: 'Teacher updated successfully',
      data: teacher,
    });
  }
});

//@desc PUT: Update Teacher by Admin
//@route /api/v1/teachers/:teacherId/admin
//@access Private Admin Only
exports.adminUpdateTeacherCtrl = AsyncHandler(async (req, res) => {
  const { program, classLevel, academicYear, subject } = req.body;
  // if teacher exists,
  const teacherFound = await Teacher.findById(req.params.teacherId);
  if (!teacherFound) throw new Error('Teacher not found');

  // check teacher is withdrawn?
  if (teacherFound.isWithdrawn) {
    throw new Error('Action denied, Teacher is withdrawn');
  }

  // assign a program
  if (program) {
    teacherFound.program = program;
    await teacherFound.save();
    res.status(200).json({
      status: 'success',
      data: teacherFound,
      message: 'Details updated successfully!',
    });
  }

  // assign class level
  if (classLevel) {
    teacherFound.classLevel = classLevel;
    await teacherFound.save();
    res.status(200).json({
      status: 'success',
      data: teacherFound,
      message: 'Details updated successfully!',
    });
  }

  // assign Academic Year
  if (academicYear) {
    teacherFound.academicYear = academicYear;
    await teacherFound.save();
    res.status(200).json({
      status: 'success',
      data: teacherFound,
      message: 'Details updated successfully!',
    });
  }

  // assign subject
  if (subject) {
    teacherFound.subject = subject;
    await teacherFound.save();
    res.status(200).json({
      status: 'success',
      data: teacherFound,
      message: 'Details updated successfully!',
    });
  }
});
