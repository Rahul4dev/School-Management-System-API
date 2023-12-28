const Student = require('../model/Academic/Student');
const verifyToken = require('../utils/verifyToken');

const isStudentLoggedIn = async (req, res, next) => {
  // get token from header
  const bearerToken = req.headers?.authorization?.split(' ')[1];
  // verify token
  const isVerified = verifyToken(bearerToken);
  // find the Admin user
  const user = await Student.findById(isVerified.id).select('name email role');
  // save the user into req.obj
  if (isVerified) {
    // save Student data in req object
    req.userAuth = user;
    next();
  } else {
    const err = new Error('Token is expired/invalid');
    next(err);
  }
};

module.exports = isStudentLoggedIn;
