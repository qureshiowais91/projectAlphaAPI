const School = require('../models/School');
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

async function schoolDetailByInviteCode(req, res) {
  const { profile } = req.query;
  console.log(profile);
  if (!profile) {
    throw new CustomError('InviteCode Is Missing', 404);
  }

  const schoolDetails = await School.find({ username: profile }).select([
    'name',
    'address',
    'contactDetails',
    'facilities',
  ]);

  console.log(schoolDetails);
  res.status(200).json(schoolDetails[0]);
}

module.exports = {
  getProfile,
  getRelatedSchoolInfo,
  schoolDetailByInviteCode,
};
