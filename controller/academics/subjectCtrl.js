const AsyncHandler = require('express-async-handler');
const Subject = require('../../model/Academic/Subject.js');
const Program = require('../../model/Academic/Program.js');

//@desc Create new Program
//@route Post /api/v1/subjects/:programId
//@access Private
exports.createSubject = AsyncHandler(async (req, res) => {
  // destructure the payload
  const { name, description, academicTerm } = req.body;

  // program
  const program = await Program.findById(req.params.programId);
  if (!program) throw new Error(`Program not found`);

  // check if exists
  const subject = await Subject.findOne({ name });
  if (subject) throw new Error(`${name} already exists`);

  // create
  const subjectCreated = await Subject.create({
    name,
    description,
    academicTerm,
    createdBy: req.userAuth._id,
  });
  // push subject into program data
  program.subjects.push(subjectCreated._id);
  await program.save();

  // Response
  res.status(200).json({
    status: 'success',
    message: 'Subject created successfully',
    data: subjectCreated,
  });
});

//@desc Get All subjects
//@route GET /api/v1/subjects
//@access Private
exports.getAllSubjects = AsyncHandler(async (req, res) => {
  const subjects = await Subject.find();
  if (!subjects) throw new Error('No subject found, please create a new one!');

  res.status(200).json({
    status: 'success',
    message: 'Subjects fetched successfully',
    data: subjects,
  });
});

//@desc Get single subject
//@route GET /api/v1/subjects/:id
//@access Private
exports.getSingleSubject = AsyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) throw new Error('There is no such subject, please try again!');

  res.status(200).json({
    status: 'success',
    message: 'Subject fetched successfully',
    data: subject,
  });
});

//@desc Update single Subject
//@route PUT /api/v1/subjects/:id
//@access Private
exports.updateSubject = AsyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;
  // if name exists
  const subjectFound = await Subject.findOne({ name });
  if (subjectFound) throw new Error(`${name} already exists`);
  const subject = await Subject.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      academicTerm,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: 'success',
    message: 'Subject updated successfully',
    data: subject,
  });
});

//@desc Delete Subject
//@route DELETE /api/v1/subjects/:id
//@access Private
exports.deleteSubject = AsyncHandler(async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Subject Deleted successfully',
  });
});
