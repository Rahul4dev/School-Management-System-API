const mongoose = require('mongoose');

const { Schema } = mongoose;

const academicYearSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fromYear: {
      type: Date,
      required: true,
    },
    toYear: {
      type: Date,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    // How many students are in this academic year
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
    // How many teachers are in this academic year
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
      },
    ],
    //Finance
    //Librarian
    //... other fields
  },
  { timestamps: true }
);

// Academic Year Model
const AcademicYear = mongoose.model('AcademicYear', academicYearSchema);

module.exports = AcademicYear;
