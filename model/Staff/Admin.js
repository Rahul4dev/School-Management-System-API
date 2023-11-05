const mongoose = require('mongoose');

// Admin Schema
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'admin',
    },
  },
  // TimeStamp to add field of createdAt and updatedAt automatically.
  { timeStamps: true }
);

// Admin Model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
