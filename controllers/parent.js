const Student = require('../models/Student');
const User = require('../models/User');
const Classroom = require('../models/Classroom');
// name
// birthdate
// class
// parentid
// teacherid
// schoolid
// Controller for adding a parent's child
const addStudent = async (req, res) => {
  try {
    // Extract child details from the request body
    const { name, birthdate, classRoom } = req.body;
    const parentId = req.user._id;
    const schoolId = req?.user?.school?._id;
    console.log(parentId);
    if (!schoolId) {
      throw new Error('Join School First');
    }
    const newStudent = await Student.create({
      name: name,
      birthdate: birthdate,
      classRoom: classRoom,
      parent: parentId,
      school: schoolId,
    });

    // Find the user (parent) by ID and add the new student's ID to the parent's list of students
    const updatedParent = await User.findByIdAndUpdate(
      parentId,
      { $push: { student: newStudent._id } },
      { new: true } // To return the updated document
    );

    // Return a success message along with the added child
    res.status(201).json({
      message: 'Student added successfully',
      Parent: updatedParent,
      newStudent: newStudent,
    });
  } catch (error) {
    // Handle any errors
    res
      .status(500)
      .json({ message: 'Failed to add child', error: error.message });
  }
};

// Controller for assigning a child to their teacher
const assignChildToTeacher = async (req, res) => {
  try {
    // Extract child ID and teacher ID from the request body
    const { childId, teacherId } = req.body;

    // Find the child by ID
    const child = await Student.findById(childId);

    // Find the teacher by ID
    const teacher = await Teacher.findById(teacherId);

    // Assign the child to the teacher
    teacher.students.push(childId);

    // Save the updated teacher
    await teacher.save();

    // Return a success message
    res.status(200).json({ message: 'Child assigned to teacher successfully' });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: 'Failed to assign child to teacher',
      error: error.message,
    });
  }
};

module.exports = {
  addStudent,
  assignChildToTeacher,
};
