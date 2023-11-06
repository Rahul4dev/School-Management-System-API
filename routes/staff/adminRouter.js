const express = require('express');

const adminRouter = express.Router();

// Controllers
const {
  registerAdminCtrl,
  getAllAdmins,
  getSingleAdminCtrl,
  adminLoginCtrl,
  updateAdminCtrl,
  deleteAdminCtrl,
  suspendTeacherAdminCtrl,
  unsuspendTeacherAdminCtrl,
  withdrawTeacherAdminCtrl,
  unWithdrawTeacherAdminCtrl,
  publishExamAdminCtrl,
  unpublishExamAdminCtrl,
} = require('../../controller/staff/adminCtrl');

// Admin Register
adminRouter.post('/register', registerAdminCtrl);

//get all admins
adminRouter.get('/', getAllAdmins);

//get single admin
adminRouter.get('/:id', getSingleAdminCtrl);

// Admin Login
adminRouter.post('/login', adminLoginCtrl);

// update Admin
adminRouter.put('/:id', updateAdminCtrl);

// delete Admin
adminRouter.delete('/:id', deleteAdminCtrl);

// Admin suspending a teacher
adminRouter.put('/suspend/teacher/:id', suspendTeacherAdminCtrl);

// Admin Un-suspending a teacher
adminRouter.put('/unsuspend/teacher/:id', unsuspendTeacherAdminCtrl);

// Admin withdrawing a teacher
adminRouter.put('/withdraw/teacher/:id', withdrawTeacherAdminCtrl);

// Admin un-withdrawing a teacher
adminRouter.put('/unwithdraw/teacher/:id', unWithdrawTeacherAdminCtrl);

// Admin publishing a exam result
adminRouter.put('/publish/exam/:id', publishExamAdminCtrl);

// Admin removing a exam result
adminRouter.put('/unpublish/exam/:id', unpublishExamAdminCtrl);

module.exports = adminRouter;
