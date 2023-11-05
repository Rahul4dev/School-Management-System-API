const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    // Objective type questions
    optionA: {
      type: String,
      required: true,
    },
    optionB: {
      type: String,
      required: true,
    },
    optionC: {
      type: String,
      required: true,
    },
    optionD: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Model
const Question = model('Question', questionSchema);

module.exports = Question;
