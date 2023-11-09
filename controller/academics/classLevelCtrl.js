const AsyncHandler = require('express-async-handler');
const ClassLevel = require('../../model/Academic/ClassLevel.js');
const Admin = require('../../model/staff/Admin.js');

//@desc Create new Class Level
//@route Post /api/v1/class-levels
//@access Private
exports.createClassLevel = AsyncHandler(async (req, res) => {
  // destructure the payload
  const { name, description } = req.body;

  // check if exists
  const classLevel = await ClassLevel.findOne({ name });
  if (classLevel) throw new Error('Class Level already exists');

  // create
  const classLevelCreated = await ClassLevel.create({
    name,
    description,
    createdBy: req.userAuth._id,
  });
  // push ClassLevel into admin profile
  const admin = await Admin.findById(req.userAuth._id);
  admin.classLevels.push(classLevelCreated._id);
  await admin.save();
  res.status(200).json({
    status: 'success',
    message: 'Class Level created successfully',
    data: classLevelCreated,
  });
});

//@desc Get All Class Levels
//@route GET /api/v1/class-levels
//@access Private
exports.getAllClassLevels = AsyncHandler(async (req, res) => {
  const classLevels = await ClassLevel.find();
  if (!classLevels)
    throw new Error(
      'There is no Class Level created, please create a new one!'
    );

  res.status(200).json({
    status: 'success',
    message: 'Class Levels fetched successfully',
    data: classLevels,
  });
});

//@desc Get single Class Level
//@route GET /api/v1/class-levels/:id
//@access Private
exports.getSingleClassLevel = AsyncHandler(async (req, res) => {
  const classLevel = await ClassLevel.findById(req.params.id);
  if (!classLevel)
    throw new Error('There is no such Class Level, please try again!');

  res.status(200).json({
    status: 'success',
    message: 'Class Level fetched successfully',
    data: classLevel,
  });
});

//@desc Update single Class Level
//@route PUT /api/v1/class-levels/:id
//@access Private
exports.updateClassLevel = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  // if name exists
  const classLevelFound = await ClassLevel.findOne({ name });
  if (classLevelFound) throw new Error(`${name} already exists`);
  const classLevel = await ClassLevel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: 'success',
    message: 'Class Level updated successfully',
    data: classLevel,
  });
});

//@desc Delete Class Level
//@route DELETE /api/v1/class-levels/:id
//@access Private
exports.deleteClassLevel = AsyncHandler(async (req, res) => {
  await ClassLevel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Class Level Deleted successfully',
  });
});
