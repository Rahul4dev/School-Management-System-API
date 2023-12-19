const Teacher = require('../model/staff/Teacher');
const verifyToken = require('../utils/verifyToken');

const isLoggedIn = async (req, res, next) => {
  // get token from header
  const bearerToken = req.headers?.authorization?.split(' ')[1];
  // verify token
  const isVerified = verifyToken(bearerToken);
  // find the Admin user
  const user = await Teacher.findById(isVerified.id).select('name email role');
  // save the user into req.obj
  if (isVerified) {
    // save teacher data in req object
    req.userAuth = user;
    next();
  } else {
    const err = new Error('Token is expired/invalid');
    next(err);
  }
};

module.exports = isLoggedIn;
