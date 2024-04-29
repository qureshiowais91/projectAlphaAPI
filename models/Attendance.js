const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Attendance Schema
const attendanceSchema = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    arrivalTime: {
        type: Date,
        default: null
    },
    departureTime: {
        type: Date,
        default: null
    },
    notes: {
        type: String,
        default: ''
    }
});

// Create the Attendance model
const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
