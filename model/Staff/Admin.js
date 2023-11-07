const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  { timestamps: true }
);

// pre-middleware in mongoose to
adminSchema.pre('save', async function (next) {
  // if user try to modify existing password
  if (this.isModified('password')) next();
  // salt
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// verify password
adminSchema.methods.verifyPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// Admin Model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
