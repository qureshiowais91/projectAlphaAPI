const StaffAttendance = require('../models/staffAttendance'); // Importing the StaffAttendance model
const { mongoose } = require('mongoose');
const customErrorHandler = require('../middleware/errorHandler');

const createAttendance = async (req, res) => {
  const { schoolId, approximateLocation } = req.body;
  const teacherId = req.user._id;
  const userSchoolId = req.user.school;
  console.log(req.user);
  try {
    // Get today's date
    // check if school id from user object
    if (schoolId != userSchoolId) {
      res.status(201).json({ message: 'QR ID Does Not Match With Database' });
    }

    const today = new Date();
    today.setHours(5, 0, 0, 0); // Set hours to 5:00 AM, minutes, seconds, and milliseconds to 0

    // Find existing attendance for the same day, school ID, and teacher ID
    let attendance = await StaffAttendance.findOne({
      schoolId: schoolId,
      teacherId: teacherId,
      loginTime: { $gte: today },
    });

    if (attendance) {
      // If attendance exists for the same day, school ID, and teacher ID, update it with new attendance log
      res.status(201).json({ message: 'Attendance Already Exist' });
    } else {
      // If no attendance exists, create a new attendance record
      attendance = await StaffAttendance.create({
        schoolId: schoolId,
        teacherId: teacherId,
        approximateLocation: approximateLocation,
      }); // Save the new attendance record
      // Send success response
      res.status(201).json({
        message: 'Attendance record created successfully.',
        attendance: attendance,
      });
    }
  } catch (error) {
    // Handle errors
    console.error('Error creating attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Function to fetch attendance data based on school ID.
 * @param {string} token - Authentication token.
 * @param {string} schoolId - ID of the school for which attendance is to be fetched.
 * @returns {Promise<Array<Object>>} Promise representing attendance data.
 */

async function getStaffAttendanceList(req, res) {
  const schoolId = req.user.school; // Assuming schoolId is stored in req.user.school after authentication
  
  // Query staff attendance records based on the provided school ID
  if (!schoolId) {
    throw new customErrorHandler(404, 'SchoolId Missing');
  }

  const attendanceList = await StaffAttendance.aggregate([
    { $match: { schoolId: new mongoose.Types.ObjectId(schoolId) } }, // Match documents by schoolId
    {
      $lookup: {
        from: 'users', // Collection name of the Teacher model
        localField: 'teacherId',
        foreignField: '_id',
        as: 'teacherInfo',
      },
    },
    { $unwind: '$teacherInfo' }, // Unwind the teacherInfo array
    {
      $project: {
        _id: 1,
        schoolId: 1,
        loginTime: 1,
        logoutTime: 1,
        approximateLocation: 1,
        teacherInfo: { _id: 1, name: 1, email: 1 }, // Specify the fields you want from the teacher document
      },
    },
  ]);

  // If attendance records found, send them in the response
  if (attendanceList.length > 0) {
    throw new customErrorHandler(404, 'Attandance List 0 Or Does Not Retrived');
  } else {
    // If no attendance records found, send appropriate message
    throw new customErrorHandler(
      404,
      'No staff attendance records found for the provided school ID.'
    );
  }
}

module.exports = {
  createAttendance,
  getStaffAttendanceList,
};
