const User = require('../models/User'); // Assuming your User model file is in the 'models' directory

const getTeachersBySchoolId = async (req, res) => {
  const schoolId = req.user.school;
  console.log(schoolId);

  const teachers = User.find({ school: schoolId });

  // const teachers = await User.find({ school: schoolId, role: 'teacher' });
  res.json(teachers);
};

module.exports = {
  getTeachersBySchoolId,
};
