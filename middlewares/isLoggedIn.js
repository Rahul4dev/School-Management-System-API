const Admin = require('../model/staff/Admin');
const verifyToken = require('../utils/verifyToken');

const isLoggedIn = async (req, res, next) => {
  // get token from header
  const bearerToken = req.headers?.authorization?.split(' ')[1];
  // verify token
  const isVerified = verifyToken(bearerToken);
  // find the Admin user
  const user = await Admin.findById(isVerified.id).select('name email role');
  // save the user into req.obj
  if (isVerified) {
    req.userAuth = user;
    next();
  } else {
    const err = new Error('Token is expired/invalid');
    next(err);
  }
};

module.exports = isLoggedIn;
