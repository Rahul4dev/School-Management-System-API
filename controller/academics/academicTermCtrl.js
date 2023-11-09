const AsyncHandler = require('express-async-handler');
const AcademicTerm = require('../../model/Academic/AcademicTerm.js');
const Admin = require('../../model/staff/Admin.js');

//@desc Create new academic Term
//@route Post /api/v1/academic-Terms
//@access Private
exports.createAcademicTerm = AsyncHandler(async (req, res) => {
  // destructure the payload
  const { name, description, duration } = req.body;

  // check if exists
  const academicTerm = await AcademicTerm.findOne({ name });
  if (academicTerm) throw new Error('Academic Term already exists');

  // create
  const academicTermCreated = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: req.userAuth._id,
  });
  // push academicTerm into admin profile
  const admin = await Admin.findById(req.userAuth._id);
  admin.academicTerms.push(academicTermCreated._id);
  await admin.save();
  res.status(200).json({
    status: 'success',
    message: 'Academic Term created successfully',
    data: academicTermCreated,
  });
});

//@desc Get All academic Terms
//@route GET /api/v1/academic-Terms
//@access Private
exports.getAllAcademicTerms = AsyncHandler(async (req, res) => {
  const academicTerms = await AcademicTerm.find();
  if (!academicTerms)
    throw new Error(
      'There is no Academic Term created, please create a new one!'
    );

  res.status(200).json({
    status: 'success',
    message: 'Academic Terms fetched successfully',
    data: academicTerms,
  });
});

//@desc Get single academic Term
//@route GET /api/v1/academic-Terms/:id
//@access Private
exports.getSingleAcademicTerm = AsyncHandler(async (req, res) => {
  const academicTerm = await AcademicTerm.findById(req.params.id);
  if (!academicTerm)
    throw new Error('There is no such Academic Term, please try again!');

  res.status(200).json({
    status: 'success',
    message: 'Academic Term fetched successfully',
    data: academicTerm,
  });
});

//@desc Update single academic Term
//@route PUT /api/v1/academic-Terms/:id
//@access Private
exports.updateAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  // if name exists
  const academicTermFound = await AcademicTerm.findOne({ name });
  if (academicTermFound) throw new Error(`${name} already exists`);
  const academicTerm = await AcademicTerm.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      duration,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: 'success',
    message: 'Academic Term updated successfully',
    data: academicTerm,
  });
});

//@desc Delete single academic Term
//@route DELETE /api/v1/academic-Terms/:id
//@access Private
exports.deleteAcademicTerm = AsyncHandler(async (req, res) => {
  await AcademicTerm.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Academic Term Deleted successfully',
  });
});
