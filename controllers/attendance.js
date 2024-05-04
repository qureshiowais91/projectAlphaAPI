const Attendance = require('../models/Attendance');
const Student = require("../models/Student");
const  notify  = require('../util/message');
// Controller function to create attendance record
const createAttendance = async (req, res) => {
  try {
    const { presents, absents, classroomId } = req.body;
    const teacherId = req.user._id;
    const schoolId = req.user.school._id;

    // check if today any attendance made to same classroomId
    const today = new Date();
    // Set the time to the start of the day (midnight)
    today.setHours(0, 0, 0, 0);

    // Get records created today
    const isAttendance = await Attendance.find({
      classroomId: classroomId,
      date: { $gte: today },
    });
    // console.log(isAttendance);
    if (false) {
      res
        .status(200)
        .json(
          'Attendance has already been submitted for this classroom today.'
        );
    } else {
      const attendance = await Attendance.create({
        schoolId,
        classroomId,
        presents,
        absents,
        teacherId,
      });

      // find phoneNumber of Parents
      const students = await Student.find({ _id: { $in: absents } }).populate('parent')

      const parents = []
      students.forEach(student => {
        parents.push(student.parent)
      })

      const phoneNumbers = []
      parents.forEach((parent) => {
        if (parent?.phonenumber) {
          phoneNumbers.push(parent.phonenumber)
        }
      })
      console.log(phoneNumbers);
      notify("+917096120270");

      res.status(201).json({
        message: 'Attendance record created successfully',
        attendance,
      });
    }
  } catch (error) {
    console.error('Error creating attendance record:', error);
    res.status(500).json(error);
  }
};

module.exports = { createAttendance };
