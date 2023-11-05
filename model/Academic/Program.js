const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProgramSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
      default: '4 years',
    },

    // created automatically
    // CSFTY
    code: {
      type: String,
      default: function () {
        return (
          this.name
            .split(' ')
            .map((name) => name[0])
            .join('')
            .toUpperCase() +
          Math.floor(Math.random() * 90 + 10) +
          Math.floor(Math.random() * 90 + 10)
        );
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },

    // we will push the teacher in-charge of the program
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        default: [],
      },
    ],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        default: [],
      },
    ],
    // we will push the subjects that are in the program when the program is created
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        default: [],
      },
    ],
  },
  { timestamps: true }
);

// Our Program Model by compiling the schema
const Program = mongoose.model('Program', ProgramSchema);

module.exports = Program;
