const Attendance = require('../models/Attendance');

// Controller function to create attendance record
const createAttendance = async (req, res) => {
    try {
        const { presents, absents } = req.body;
        const teacherId = req.user._id;
        const schoolId = req.user.school._id;

        const attendance = await Attendance.create({
            schoolId,
            presents,
            absents,
            teacherId
        });

        res.status(201).json({ message: 'Attendance record created successfully', attendance });
    } catch (error) {
        console.error('Error creating attendance record:', error);
        res.status(500).json({ error: 'An error occurred while creating attendance record' });
    }
};

module.exports = { createAttendance };