const AsyncHandler = require('express-async-handler');
const Admin = require('../../model/staff/Admin.js');
const generateToken = require('../../utils/generateToken.js');

//@desc POST: Register new Admin
//@route /api/v1/admins/register
//@access Private
exports.registerAdminCtrl = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Check if the Admin is already exists
  const adminFound = await Admin.findOne({ email });
  if (adminFound) {
    throw new Error('Admin already exists');
  }
  // register the Admin
  const user = await Admin.create({
    name,
    email,
    password,
  });
  res.status(200).json({
    status: 'success',
    data: user,
  });
});

//@desc Get: all Admins
//@route /api/v1/admins/
//@access Private
exports.getAllAdmins = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'All Admins',
    });
  } catch (error) {
    res.json({
      status: 'Failed',
      error: error.message,
    });
  }
};

//@desc Get: Single Admin
//@route /api/v1/admins/:id
//@access Private
exports.getSingleAdminCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Single Admins',
    });
  } catch (error) {
    res.json({
      status: 'Failed',
      error: error.message,
    });
  }
};

//@desc POST: Login Admin
//@route /api/v1/admins/login
//@access Private
exports.adminLoginCtrl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // find user
  const user = await Admin.findOne({ email });
  if (!user) return res.json({ message: 'Invalid Login credentials' });

  if (user && (await user.verifyPassword(password))) {
    // save the user in request object session
    req.userAuth = user;
    return res.json({ data: generateToken(user._id) });
  } else {
    return res.json({ message: 'Invalid Login credentials' });
  }
});

//@desc PUT: Update Admin
//@route /api/v1/admins/:id
//@access Private
exports.updateAdminCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Admin has been updated successfully',
    });
  } catch (error) {
    res.json({
      status: 'Failed',
      error: error.message,
    });
  }
};

//@desc DELETE: Admin
//@route /api/v1/admins/:id
//@access Private
exports.deleteAdminCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Admin has been deleted successfully',
    });
  } catch (error) {
    res.json({
      status: 'Failed',
      error: error.message,
    });
  }
};

//@desc PUT: Admin suspending a teacher
//@route /api/v1/admins/suspend/teacher/:id
//@access Private
exports.suspendTeacherAdminCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Admin has suspended a teacher',
    });
  } catch (error) {
    res.json({
      status: 'Failed',
      error: error.message,
    });
  }
};

//@desc PUT: Admin Un-suspending a teacher
//@route /api/v1/admins/unsuspend/teacher/:id
//@access Private
exports.unsuspendTeacherAdminCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Admin has un-suspended a teacher',
    });
  } catch (error) {
    res.json({
      status: 'Failed',
      error: error.message,
    });
  }
};

//@desc PUT: Admin withdrawing a teacher
//@route /api/v1/admins/withdraw/teacher/:id
//@access Private
exports.withdrawTeacherAdminCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Admin has withdraw a teacher',
    });
  } catch (error) {
    res.json({
      status: 'Failed',
      error: error.message,
    });
  }
};

//@desc PUT: Admin un-withdrawing a teacher
//@route /api/v1/admins/unwithdraw/teacher/:id
//@access Private
exports.unWithdrawTeacherAdminCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Admin has un-withdraw a teacher',
    });
  } catch (error) {
    res.json({
      status: 'Failed',
      error: error.message,
    });
  }
};

//@desc PUT: Admin publishing a exam result
//@route /api/v1/admins/publish/exam/:id
//@access Private
exports.publishExamAdminCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Admin has published an Exam result',
    });
  } catch (error) {
    res.json({
      status: 'Failed',
      error: error.message,
    });
  }
};

//@desc PUT: Admin un-publishing a exam result
//@route /api/v1/admins/unpublish/exam/:id
//@access Private
exports.unpublishExamAdminCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Admin has removed an Exam result',
    });
  } catch (error) {
    res.json({
      status: 'Failed',
      error: error.message,
    });
  }
};
