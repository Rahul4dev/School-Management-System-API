const Admin = require('../model/staff/Admin.js');

const isAdmin = async (req, res, next) => {
  // find the Admin user
  const userId = req?.userAuth?._id;

  const adminFound = await Admin.findById(userId);

  if (adminFound?.role === 'admin') next();
  else next(new Error('Access denied, Admin Only!'));
};

module.exports = isAdmin;
