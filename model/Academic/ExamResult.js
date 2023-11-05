const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const examResultSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    exam: {
      type: Schema.Types.ObjectId,
      ref: 'Exam',
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    passMark: {
      type: Number,
      required: true,
      default: 50,
    },
    // Failed or Passed tests
    status: {
      type: String,
      required: true,
      enum: ['Failed', 'Passed'],
      default: 'Failed',
    },
    // Excellent or Satisfactory Remarks
    remarks: {
      type: String,
      required: true,
      enum: ['Excellent', 'Satisfactory', 'Good', 'Poor'],
      default: 'Poor',
    },
    position: {
      type: Number,
      required: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
    },
    classLevel: {
      type: Schema.Types.ObjectId,
      ref: 'ClassLevel',
    },
    academicTerm: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicTerm',
    },
    academicYear: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicYear',
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//Model
const ExamResult = model('ExamResult', examResultSchema);

module.exports = ExamResult;
