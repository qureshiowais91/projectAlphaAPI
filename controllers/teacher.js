const User = require('../models/User'); // Assuming your User model file is in the 'models' directory
const CustomError = require('../util/error');

const getTeachersBySchoolId = async (req, res) => {
  const schoolId = req.user.school;
  console.log(schoolId);

  const teachers = User.find({ school: schoolId });

  // const teachers = await User.find({ school: schoolId, role: 'teacher' });
  res.json(teachers);
};

async function getTeacherProfile(req, res) {
  const { email } = req.query;
  if (!email) {
    throw new CustomError('Email Missing in Request', 404);
  }

  const teacherProfile = await User.findOne({ email });

  if (!teacherProfile) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ teacherProfile });
}

module.exports = {
  getTeachersBySchoolId,
  getTeacherProfile,
};
