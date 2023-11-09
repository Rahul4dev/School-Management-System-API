const AsyncHandler = require('express-async-handler');
const AcademicYear = require('../../model/Academic/AcademicYear.js');
const Admin = require('../../model/staff/Admin.js');

//@desc Create new academic year
//@route Post /api/v1/academic-years
//@access Private
exports.createAcademicYear = AsyncHandler(async (req, res) => {
  // destructure the payload
  const { name, fromYear, toYear, createdBy } = req.body;

  // check if exists
  const academicYear = await AcademicYear.findOne({ name });
  if (academicYear) throw new Error('Academic year already exists');

  // create
  const academicYearCreated = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: req.userAuth._id,
  });
  res.status(200).json({
    status: 'success',
    message: 'Academic Year created successfully',
    data: academicYearCreated,
  });
});

//@desc Get All academic years
//@route GET /api/v1/academic-years
//@access Private
exports.getAllAcademicYears = AsyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.find();
  if (!academicYears)
    throw new Error(
      'There is no Academic Year created, please create a new one!'
    );

  res.status(200).json({
    status: 'success',
    message: 'Academic Year fetched successfully',
    data: academicYears,
  });
});
//@desc Get single academic year
//@route GET /api/v1/academic-years/:id
//@access Private
exports.getSingleAcademicYear = AsyncHandler(async (req, res) => {
  const academicYear = await AcademicYear.findById(req.params.id);
  console.log(req.params.id);
  if (!academicYear)
    throw new Error('There is no such Academic Year, please try again!');

  res.status(200).json({
    status: 'success',
    message: 'Academic Year fetched successfully',
    data: academicYear,
  });
});
