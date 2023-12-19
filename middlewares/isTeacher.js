const Teacher = require('../model/staff/Teacher.js');

const isTeacher = async (req, res, next) => {
  // find the Teacher user
  const userId = req?.userAuth?._id;

  const teacherFound = await Teacher.findById(userId);

  if (teacherFound?.role === 'teacher') next();
  else next(new Error('Access denied, Teacher Only!'));
};

module.exports = isTeacher;
