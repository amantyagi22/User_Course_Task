const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    // Default is 7 days from now
    default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
  endDate: {
    type: Date,
    // Default is 14 days from now
    default: () => Date.now() + 14 * 24 * 60 * 60 * 1000,
  },
  usersEnrolled: {
    type: [String],
    default: [],
  },
});

module.exports = model("Course", CourseSchema);
