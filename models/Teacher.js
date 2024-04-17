const mongoose = require('mongoose');

// Define the schema for the teacher
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  qualifications: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  subjects: [{
    type: String,
    required: true
  }],
  jobSeeking: {
    type: Boolean,
    default: false
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  }
});

// Create a model from the schema
const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
