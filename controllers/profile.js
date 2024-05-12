const User = require('../models/User');
const CustomError = require('../util/error');

// Controller function for the getProfile endpoint
// return school and full profile
async function getProfile(req, res) {
  const userId = req.user.userId;

  if (!userId) {
    return new CustomError('User Id Missing', 404);
  }

  // Find the user by userId and populate the 'school' field
  const user = await User.findById(userId).populate('school');

  if (!user) {
    return new CustomError('User Not Found', 404);
  }

  res.status(200).json(user);
}

// select school and only return it
async function getRelatedSchoolInfo(req, res) {
  const userId = req.user.userId;

  if (!userId) {
    return new CustomError('User Id Missing', 404);
  }

  const user = await User.findById(userId)
    .populate({
      path: 'school',
    })
    .select('-_id school');

  if (!user?.school) {
    throw new CustomError('School Not Found in User Object', 404);
  }

  res.status(200).json({ school: user?.school });
}

module.exports = {
  getProfile,
  getRelatedSchoolInfo,
};
