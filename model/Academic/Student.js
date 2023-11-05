const mongoose = require('mongoose');

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
});
