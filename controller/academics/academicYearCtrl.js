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
  // push academicYear into admin profile
  const admin = await Admin.findById(req.userAuth._id);
  admin.academicYears.push(academicYearCreated._id);
  await admin.save();
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
  if (!academicYear)
    throw new Error('There is no such Academic Year, please try again!');

  res.status(200).json({
    status: 'success',
    message: 'Academic Year fetched successfully',
    data: academicYear,
  });
});

//@desc Update single academic year
//@route PUT /api/v1/academic-years/:id
//@access Private
exports.updateAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;
  // if name exists
  const academicYearFound = await AcademicYear.findOne({ fromYear });
  if (academicYearFound) throw new Error(`${name} already exists`);
  const academicYear = await AcademicYear.findByIdAndUpdate(
    req.params.id,
    {
      name,
      fromYear,
      toYear,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: 'success',
    message: 'Academic Year updated successfully',
    data: academicYear,
  });
});

//@desc Delete single academic year
//@route DELETE /api/v1/academic-years/:id
//@access Private
exports.deleteAcademicYear = AsyncHandler(async (req, res) => {
  await AcademicYear.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Academic Year Deleted successfully',
  });
});
