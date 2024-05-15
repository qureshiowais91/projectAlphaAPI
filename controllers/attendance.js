const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const School = require('../models/School');
const { attandanceNotice } = require('../util/welcomeMail');
const Classroom = require('../models/Classroom');
const mongoose = require('mongoose');
const User = require('../models/User');

const createAttendance = async (req, res) => {
  try {
    const { presents, absents, classroomId } = req.body;
    const teacherId = req.user._id;
    const schoolId = req.user.school._id;

    if (!teacherId && !schoolId) {
      res.status(404).json('join school or make request as teacher');
    }
    // check if today any attendance made to same classroomId
    const today = new Date();
    // Set the time to the start of the day (midnight)
    today.setHours(0, 0, 0, 0);

    // Get records created today
    const isAttendance = await Attendance.find({
      classroomId: classroomId,
      date: { $gte: today },
    });

    if (!(isAttendance.length === 0)) {
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

      const school = await School.find({ _id: schoolId });
      const schoolName = school[0].name;
      const contactDetails = school[0].contactDetails;
      const absentsToday = attendance.absents;
      const students = await Student.find({
        _id: { $in: absentsToday },
      }).populate('parent');

      const emails = students
        .map((student) => student.parent?.email) // Use map for concise code
        .filter((email) => email);

      const absentReporter = await User.findOne({ _id: teacherId });
       conosle.log(absentReporter)

      async function main(emailsArray) {
        for (const email of emailsArray) {
          await attandanceNotice(
            email,
            schoolName,
            contactDetails,
              absentReporter.email
          );
        }
      }

      main(emails).catch(console.error);

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

async function getAttendanceSummary(req, res) {
  try {
    const schoolId = req.user.school;

    const attendanceSummary = await Attendance.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date() - 24 * 60 * 60 * 1000), // Filter for the past 24 hours
            $gte: new Date(new Date().setHours(1, 0, 0, 0)), // Filter for after 1:00 AM
          },
          schoolId: new mongoose.Types.ObjectId(schoolId), // Convert schoolId to ObjectId and filter
        },
      },
      {
        $group: {
          _id: '$classroomId',
          classroom: { $first: '$classroomId' },
          presentTotal: { $sum: { $size: '$presents' } },
          absentTotal: { $sum: { $size: '$absents' } },
        },
      },
      {
        $lookup: {
          from: 'classrooms',
          localField: 'classroom',
          foreignField: '_id',
          as: 'classroomData',
        },
      },
      {
        $unwind: '$classroomData', // Unwind the classroomData array
      },
      {
        $project: {
          _id: 1,
          classroom: '$classroomData.classroom',
          presentTotal: 1,
          absentTotal: 1,
        },
      },
    ]);

    res.status(200).json({ attendanceSummary });
  } catch (error) {
    console.error('Error getting attendance summary:', error);
    res.status(404).json('server error');
    throw error;
  }
}

module.exports = { createAttendance, getAttendanceSummary };
