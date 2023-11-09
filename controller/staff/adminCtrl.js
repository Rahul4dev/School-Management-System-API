const bcrypt = require('bcryptjs');
const AsyncHandler = require('express-async-handler');
const Admin = require('../../model/staff/Admin.js');
const generateToken = require('../../utils/generateToken.js');
const { hashPassword, isPasswordMatched } = require('../../utils/helpers.js');

//@desc POST: Register new Admin
//@route /api/v1/admins/register
//@access Private
exports.registerAdminCtrl = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Check if the Admin is already exists
  const adminFound = await Admin.findOne({ email });
  if (adminFound) throw new Error('Admin already exists');

  // register the Admin with hashed password
  const user = await Admin.create({
    name,
    email,
    password: await hashPassword(password),
  });
  res.status(200).json({
    status: 'success',
    message: 'Admin registered successfully',
    data: user,
  });
});

//@desc Get: all Admins
//@route /api/v1/admins/
//@access Private
exports.getAllAdmins = AsyncHandler(async (req, res) => {
  const admins = await Admin.find();
  res.status(200).json({
    status: 'success',
    message: 'Admins fetched successfully',
    data: admins,
  });
});

//@desc Get: Single Admin Profile
//@route /api/v1/admins/:id
//@access Private
exports.getAdminProfileCtrl = AsyncHandler(async (req, res) => {
  const user = req.userAuth;
  const admin = await Admin.findById(user._id)
    .select('-password -createdAt -updatedAt')
    .populate('academicYears');
  if (!admin) throw new Error('Admin not found');
  else {
    res.status(200).json({
      status: 'OK',
      message: 'Admin profile fetched successfully',
      data: admin,
    });
  }
});

//@desc POST: Login Admin
//@route /api/v1/admins/login
//@access Private
exports.adminLoginCtrl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // find user
  const user = await Admin.findOne({ email });
  if (!user) return res.json({ message: 'Invalid Login credentials' });

  // verify password
  const isMatched = await isPasswordMatched(password, user.password);

  if (!isMatched) return res.json({ message: 'Invalid Login credentials' });
  else {
    return res.json({
      data: generateToken(user._id),
      message: 'Admin logged in successfully!',
    });
  }
});

//@desc PUT: Update Admin
//@route /api/v1/admins/:id
//@access Private
exports.updateAdminCtrl = AsyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  // if email exists,
  const emailExist = await Admin.findOne({ email });
  if (emailExist) throw new Error('Email is already taken');

  // check if user updating the password
  if (password) {
    // update password along with email, name and hashed password
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        name,
        password: await hashPassword(password),
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      message: 'Admin updated successfully',
      data: admin,
    });
  } else {
    // update
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      message: 'Admin updated successfully',
      data: admin,
    });
  }
});

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
