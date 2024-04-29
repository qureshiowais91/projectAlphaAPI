const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Attendance Schema
const attendanceSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
  presents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
  ],
  absents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: false,
    },
  ],
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create the Attendance model
const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
