const StaffAttendance = require('../models/staffAttendance'); // Importing the StaffAttendance model

// Controller function to create new attendance based on school ID
const createAttendance = async (req, res) => {
  const { schoolId, approximateLocation } = req.body;
  const teacherId = req.user._id;
  const userSchoolId = req.user.school;
  console.log(req.user)
  try {
    // Get today's date
    // check if school id from user object
    
    if(schoolId != userSchoolId){
      res.status(201).json({ message: 'QR ID Does Not Match With Database'});
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
      res.status(201).json({ message: 'Attendance Alread Exist' });
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

module.exports = {
  createAttendance,
};
