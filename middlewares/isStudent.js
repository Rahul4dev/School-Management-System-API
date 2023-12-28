const Student = require('../model/Academic/Student');

const isStudent = async (req, res, next) => {
  // find the Student user
  const userId = req?.userAuth?._id;

  const studentFound = await Student.findById(userId);

  if (studentFound?.role === 'student') next();
  else next(new Error('Access denied, Student Only!'));
};

module.exports = isStudent;
