const Attendance = require('../models/Attendance');
const Student = require("../models/Student");
const School = require("../models/School")
const { attandanceNotice } = require("../util/welcomeMail");


// Controller function to create attendance record send phone number notification
// const createAttendance = async (req, res) => {
//   try {
//     const { presents, absents, classroomId } = req.body;
//     const teacherId = req.user._id;
//     const schoolId = req.user.school._id;

//     // check if today any attendance made to same classroomId
//     const today = new Date();
//     // Set the time to the start of the day (midnight)
//     today.setHours(0, 0, 0, 0);

//     // Get records created today
//     const isAttendance = await Attendance.find({
//       classroomId: classroomId,
//       date: { $gte: today },
//     });

//     if (isAttendance) {
//       res
//         .status(200)
//         .json(
//           'Attendance has already been submitted for this classroom today.'
//         );
//     } else {
//       const attendance = await Attendance.create({
//         schoolId,
//         classroomId,
//         presents,
//         absents,
//         teacherId,
//       });

//       // find phoneNumber of Parents
//       const students = await Student.find({ _id: { $in: absents } }).populate('parent')

//       const parents = []
//       students.forEach(student => {
//         parents.push(student.parent)
//       })

//       const phoneNumbers = []
//       parents.forEach((parent) => {
//         if (parent?.phonenumber) {
//           phoneNumbers.push(parent.phonenumber)
//         }
//       })
//       console.log(phoneNumbers);
//       notify("+917096120270");

//       res.status(201).json({
//         message: 'Attendance record created successfully',
//         attendance,
//       });
//     }
//   } catch (error) {
//     console.error('Error creating attendance record:', error);
//     res.status(500).json(error);
//   }
// };

const createAttendance = async (req, res) => {
  try {
    const { presents, absents, classroomId } = req.body;
    const teacherId = req.user._id;
    const schoolId = req.user.school._id;

    if (!teacherId && !schoolId) {
      res
        .status(404)
        .json(
          'join school or make request as teacher'
        );
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
      console.log(school, schoolName, contactDetails)
      const absentsToday = attendance.absents;
      const students = await Student.find({ _id: { $in: absentsToday } }).populate('parent')


      const parents = []
      students.forEach(student => {
        parents.push(student.parent)
      })


      const emails = []
      parents.forEach((parent) => {
        if (parent?.email) {
          emails.push(parent.email)
        }
      })


      async function main(emailsArray) {
        for (const email of emailsArray) {
          await attandanceNotice(email, schoolName, contactDetails);
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

module.exports = { createAttendance };
