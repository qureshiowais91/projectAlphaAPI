const mongoose = require('mongoose');

// Define the schema for the Teacher model
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subjectTaught: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  phoneNumber: { type: String },
});

// Creating model for Teacher
const Teacher = mongoose.model('Teacher', teacherSchema);

// Exporting models
module.exports =Teacher;
