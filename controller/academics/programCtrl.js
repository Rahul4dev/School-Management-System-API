const AsyncHandler = require('express-async-handler');
const Program = require('../../model/Academic/Program.js');
const Admin = require('../../model/staff/Admin.js');

//@desc Create new Program
//@route Post /api/v1/programs
//@access Private
exports.createProgram = AsyncHandler(async (req, res) => {
  // destructure the payload
  const { name, description, duration } = req.body;

  // check if exists
  const program = await Program.findOne({ name });
  if (program) throw new Error(`${name} already exists`);

  // create
  const programCreated = await Program.create({
    name,
    description,
    duration,
    createdBy: req.userAuth._id,
  });
  // push program into admin profile
  const admin = await Admin.findById(req.userAuth._id);
  admin.programs.push(programCreated._id);
  await admin.save();
  res.status(200).json({
    status: 'success',
    message: 'Program created successfully',
    data: programCreated,
  });
});

//@desc Get All Programs
//@route GET /api/v1/programs
//@access Private
exports.getAllPrograms = AsyncHandler(async (req, res) => {
  const programs = await Program.find();
  if (!programs)
    throw new Error('There is no Program created, please create a new one!');

  res.status(200).json({
    status: 'success',
    message: 'Programs fetched successfully',
    data: programs,
  });
});

//@desc Get single Program
//@route GET /api/v1/programs/:id
//@access Private
exports.getSingleProgram = AsyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id);
  if (!program) throw new Error('There is no such Program, please try again!');

  res.status(200).json({
    status: 'success',
    message: 'Program fetched successfully',
    data: program,
  });
});

//@desc Update single Program
//@route PUT /api/v1/programs/:id
//@access Private
exports.updateProgram = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  // if name exists
  const programFound = await Program.findOne({ name });
  if (programFound) throw new Error(`${name} already exists`);
  const program = await Program.findByIdAndUpdate(
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
    message: 'Program updated successfully',
    data: program,
  });
});

//@desc Delete Program
//@route DELETE /api/v1/programs/:id
//@access Private
exports.deleteProgram = AsyncHandler(async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Program Deleted successfully',
  });
});
