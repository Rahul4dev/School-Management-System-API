const express = require('express');

const adminRouter = express.Router();

//get all admins
adminRouter.get('/', (req, res) => {
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
});

// Admin Register
adminRouter.post('/register', (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Admin has been registered successfully',
    });
  } catch (error) {
    res.json({
      status: 'Failed registration',
      error: error.message,
    });
  }
});

// Admin Login
adminRouter.post('/login', (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Admin has been logged successfully',
    });
  } catch (error) {
    res.json({
      status: 'Failed login',
      error: error.message,
    });
  }
});

//get single admins
adminRouter.get('/:id', (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Single Admin',
    });
  } catch (error) {
    res.json({
      status: 'Failed',
      error: error.message,
    });
  }
});

// update Admin
adminRouter.put('/:id', (req, res) => {
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
});

// delete Admin
adminRouter.delete('/:id', (req, res) => {
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
});

// Admin suspending a teacher
adminRouter.put('/suspend/teacher/:id', (req, res) => {
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
});

// Admin Un-suspending a teacher
adminRouter.put('/unsuspend/teacher/:id', (req, res) => {
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
});

// Admin withdrawing a teacher
adminRouter.put('/withdraw/teacher/:id', (req, res) => {
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
});

// Admin un-withdrawing a teacher
adminRouter.put('/unwithdraw/teacher/:id', (req, res) => {
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
});

// Admin publishing a exam result
adminRouter.put('/publish/exam/:id', (req, res) => {
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
});

// Admin removing a exam result
adminRouter.put('/unpublish/exam/:id', (req, res) => {
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
});

module.exports = adminRouter;
