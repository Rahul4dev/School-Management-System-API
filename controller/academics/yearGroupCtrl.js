const AsyncHandler = require('express-async-handler');
const YearGroup = require('../../model/Academic/YearGroup.js');
const Admin = require('../../model/staff/Admin.js');

//@desc Create new Year Group / Graduation Year
//@route Post /api/v1/year-groups
//@access Private
exports.createYearGroup = AsyncHandler(async (req, res) => {
  // destructure the payload
  const { name, academicYear } = req.body;

  // check if exists
  const yearGroup = await YearGroup.findOne({ name });
  if (yearGroup) throw new Error(`${name} already exists`);

  // create
  const yearGroupCreated = await YearGroup.create({
    name,
    academicYear,
    createdBy: req.userAuth._id,
  });
  // find admin
  const admin = await Admin.findById(req.userAuth._id);
  if (!admin) throw new Error('Admin not found');

  // push yearGroup into Admin data
  admin.yearGroups.push(yearGroupCreated._id);
  await admin.save();

  // Response
  res.status(200).json({
    status: 'success',
    message: 'Subject created successfully',
    data: yearGroupCreated,
  });
});

//@desc Get All year groups
//@route GET /api/v1/year-groups
//@access Private
exports.getAllYearGroups = AsyncHandler(async (req, res) => {
  const yearGroups = await YearGroup.find();
  if (!yearGroups) throw new Error('No Year Group found!');

  res.status(200).json({
    status: 'success',
    message: 'Year Groups fetched successfully',
    data: yearGroups,
  });
});

//@desc Get single yearGroup
//@route GET /api/v1/year-groups/:id
//@access Private
exports.getSingleYearGroup = AsyncHandler(async (req, res) => {
  const yearGroup = await YearGroup.findById(req.params.id);
  if (!yearGroup)
    throw new Error('There is no such Year Group, please try again!');

  res.status(200).json({
    status: 'success',
    message: 'Year Group fetched successfully',
    data: yearGroup,
  });
});

//@desc Update single yearGroup
//@route PUT /api/v1/year-groups/:id
//@access Private
exports.updateYearGroup = AsyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;
  // if name exists
  const yearGroupFound = await YearGroup.findOne({ name });
  if (yearGroupFound) throw new Error(`${name} already exists`);
  const yearGroup = await YearGroup.findByIdAndUpdate(
    req.params.id,
    {
      name,
      academicYear,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: 'success',
    message: 'Year Group updated successfully',
    data: yearGroup,
  });
});

//@desc Delete yearGroup
//@route DELETE /api/v1/year-groups/:id
//@access Private
exports.deleteYearGroup = AsyncHandler(async (req, res) => {
  await YearGroup.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Year Group Deleted successfully',
  });
});
