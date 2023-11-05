const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const { Schema } = mongoose;

const studentSchema = new Schema({
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
  studentId: {
    type: String,
    required: true,
    default: function () {
      return (
        'STU' +
        Math.floor(Math.random() * 900 + 100) +
        Date.now().toString().slice(2, 4) +
        this.name
          .split(' ')
          .map((name) => name[0])
          .join('')
          .toUpperCase()
      );
    },
  },
  isWithDrawn: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: 'student',
  },
  // Classes are from level 1 to 6
  // Keep track of the class level the student is in
  classLevels: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ClassLevel',
      required: true,
    },
  ],
  currentClassLevel: {
    type: String,
    default: function () {
      return this.classLevels[this.classLevels.length - 1];
    },
  },
  academicYear: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicYear',
    required: true,
  },
  dateAdmitted: {
    type: Date,
    default: Date.now,
  },
  examResults: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ExamResult',
    },
  ],
  program: {
    type: Schema.Types.ObjectId,
    ref: 'Program',
    required: true,
  },
  isPromotedToLevel200: {
    type: boolean,
    default: false,
  },
  isPromotedToLevel300: {
    type: boolean,
    default: false,
  },
  isPromotedToLevel400: {
    type: boolean,
    default: false,
  },
  isGraduated: {
    type: boolean,
    default: false,
  },
  isSuspended: {
    type: boolean,
    default: false,
  },
  prefectName: {
    type: String,
  },
  behaviorReport: [
    {
      type: Schema.Types.ObjectId,
      ref: 'BehaviorReport',
    },
  ],
  financialReport: [
    {
      type: Schema.Types.ObjectId,
      ref: 'FinancialReport',
    },
  ],
  //yearGroup
  yearGraduated: {
    type: Schema.Types.ObjectId,
    ref: 'YearGroup',
  },
});

// Model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
