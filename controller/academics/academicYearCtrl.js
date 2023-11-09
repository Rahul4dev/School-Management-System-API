const AsyncHandler = require('express-async-handler');
const AcademicYear = require('../../model/Academic/AcademicYear.js');
const Admin = require('../../model/staff/Admin.js');

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
