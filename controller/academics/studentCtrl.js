const AsyncHandler = require('express-async-handler');
const Student = require('../../model/Academic/Student');
const { hashPassword, isPasswordMatched } = require('../../utils/helpers');
const generateToken = require('../../utils/generateToken');

//@desc Admin Register new Student
//@route POST /api/v1/students/admin/register
//@access Private Admin Only

exports.adminRegisterStudent = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // check if Student is already registered
  const studentExists = await Student.findOne({ email });
  if (studentExists) {
    throw new Error(`Student named ${name} already employed`);
  }

  // hash password
  const hashedPassword = await hashPassword(password);

  // register Student
  const studentCreated = await Student.create({
    name,
    email,
    password: hashedPassword,
  });

  // send Student data and response
  res.status(201).json({
    status: 'success',
    message: `${name} registered successfully`,
    data: studentCreated,
  });
});

//@desc POST: Login Student
//@route /api/v1/students/login
//@access Public
exports.studentLoginCtrl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // find student
  const student = await Student.findOne({ email });
  if (!student) return res.json({ message: 'Invalid Login credentials' });

  // verify password
  const isMatched = await isPasswordMatched(password, student?.password);

  if (!isMatched) return res.json({ message: 'Invalid Login credentials' });
  else {
    return res.json({
      data: generateToken(student?._id),
      message: 'Student logged in successfully!',
    });
  }
});

//@desc Get: all Students by Students
//@route /api/v1/students
//@access Private Teachers Only
exports.getAllStudents = AsyncHandler(async (req, res) => {
  const students = await Student.find();
  res.status(200).json({
    status: 'success',
    message: 'Students fetched successfully',
    data: students,
  });
});

//@desc Get: Single Student Profile
//@route /api/v1/students/profile
//@access Private Student Only
exports.getStudentProfileCtrl = AsyncHandler(async (req, res) => {
  const studentId = req.userAuth?._id;
  const student = await Student.findById(studentId).select('-password ');

  if (!student) throw new Error('Student not found');
  else {
    res.status(200).json({
      status: 'OK',
      message: 'Student profile fetched successfully',
      data: student,
    });
  }
});

//@desc Get: Single Student by Admin
//@route /api/v1/students/:studentId/admin
//@access Private
exports.getStudentByAdmin = AsyncHandler(async (req, res) => {
  const studentId = req.params.studentId;
  const student = await Student.findById(studentId);

  if (!student) throw new Error('Student not found');
  else {
    res.status(200).json({
      status: 'OK',
      message: 'Student detail fetched successfully',
      data: student,
    });
  }
});

//@desc PUT: Update Student
//@route /api/v1/students/update
//@access Private Student only
exports.updateStudentCtrl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // if email exists,
  const emailExist = await Student.findOne({ email });
  if (emailExist) throw new Error('Email is already taken');

  // check if user updating the password
  if (password) {
    // update password along with email, name and hashed password
    const student = await Student.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        password: await hashPassword(password),
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      message: 'Student updated successfully',
      data: student,
    });
  } else {
    // update
    const student = await Student.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      message: 'Student updated successfully',
      data: student,
    });
  }
});

//@desc PUT: Update Student by Admin eg: assigning classes and courses etc.
//@route /api/v1/students/:studentId/update/admin
//@access Private Admin Only
exports.adminUpdateStudentCtrl = AsyncHandler(async (req, res) => {
  const { name, email, program, classLevels, academicYear, prefectName } =
    req.body;
  // if Student exists,
  const studentFound = await Student.findById(req.params.studentId);
  if (!studentFound) throw new Error('Student not found');

  // check Student is withdrawn?
  if (studentFound.isWithdrawn) {
    throw new Error('Action denied, Student is withdrawn');
  }

  // Update student
  const studentUpdated = await Student.findByIdAndUpdate(
    req.params.studentId,
    {
      $set: { name, email, program, academicYear, prefectName },
      $addToSet: { classLevels },
    },
    { new: true }
  );

  // send response
  res.status(200).json({
    status: 'success',
    data: studentUpdated,
    message: 'Details updated successfully!',
  });
});
