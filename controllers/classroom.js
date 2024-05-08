const Classroom = require('../models/Classroom');
const CustomError = require('../util/error.js');
// Admin will Create New Class
// And Also Share InviteCode For Each Class
const createClassroom = async (req, res) => {
  const school = req.user.school._id;
  const { classroom } = req.body;

  if (!school) {
    throw new CustomError(
      'School Id Missing Check If You Joined School Using Invite Code',
      200
    );
  }

  if (!classroom) {
    throw new CustomError('Classroom Name Missing', 200);
  }
  // Create a new classroom directly using the create method
  const newClassroom = await Classroom.create({
    classroom: classroom,
    school: school, // Assign the school's ObjectId to the classroom
  });

  if (!newClassroom) {
    throw new CustomError('Try Again Or Contact Developer', 200);
  }

  res
    .status(201)
    .json({ newClassroom, message: 'Classroom created successfully' });
};

const getClassroom = async (req, res) => {
  try {
    const schoolId = req.user?.school?._id;
    console.log(req.user);
    if (!schoolId) {
      throw new Error('schoolId is Missing');
    }
    const classrooms = await Classroom.find({ school: schoolId }).select(
      '_id classroom'
    );
    res.status(200).json(classrooms);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

// when parent adds kids then only add to classroom also
const joinClassroom = async (req, res) => {
  try {
    const { classroomId, studentId } = req.body;
    if (!classroomId && !studentId) {
      throw new Error('Classroom or Student ID Missing');
    }
    const updatedClassroom = await Classroom.findByIdAndUpdate(
      classroomId,
      { $push: { students: studentId } },
      { new: true }
    );
    res.status(201).json({
      classroom: updatedClassroom,
      message: 'Classroom Joined Successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Join Classroom As Teacher
const joinClassroomTeacher = async (req, res) => {
  try {
    const { classroomId } = req.body;
    if (!classroomId) {
      throw new Error('Classroom Missing');
    }
    const teacherId = req.user._id;
    const updatedClassroom = await Classroom.findByIdAndUpdate(
      classroomId,
      { teacher: teacherId },
      { new: true }
    );
    res.status(201).json({
      classroom: updatedClassroom,
      message: 'Classroom Joined Successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentsOfClassroom = async (req, res) => {
  const { classroomId } = req.body;
  try {
    const classroom = await Classroom.findById(classroomId).populate(
      'students',
      '_id name'
    );

    if (!classroom) {
      throw new Error('Classroom returned empty');
    }

    const students = classroom.students;
    res.status(200).json({ students });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch students', error: error.message });
  }
};

module.exports = {
  createClassroom,
  getClassroom,
  joinClassroom,
  joinClassroomTeacher,
  getStudentsOfClassroom,
};
