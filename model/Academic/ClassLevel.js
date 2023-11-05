const mongoose = require('mongoose');

const { Schema } = mongoose;

// Like Class 1, 2 ,3 ie., Standard and How many students are there in the class level.
const classLevelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    // How many students are in that class level/Std
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    // Optional
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
      },
    ],
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Model
const ClassLevel = mongoose.model('ClassLevel', classLevelSchema);

module.exports = ClassLevel;
