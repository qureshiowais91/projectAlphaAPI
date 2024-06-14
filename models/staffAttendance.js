const mongoose = require('mongoose');

// Define schema for StaffAttendance model
const staffAttendanceSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  loginTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  logoutTime: {
    type: Date,
  },
  approximateLocation: {
    type: String,
    required: true,
  },
});

// Create model from schema
const StaffAttendance = mongoose.model(
  'StaffAttendance',
  staffAttendanceSchema
);

module.exports = StaffAttendance;
