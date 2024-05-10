const School = require('../models/School');
const User = require('../models/User');
const CustomError = require('../util/error.js');
const createSchoolSchema = require('../validators/createSchool.js');
const schoolDetailsSchema = require('../validators/additionalSchoolDetails.js');
// Controller for creating a new school
const createSchool = async (req, res) => {
  const { error, value } = createSchoolSchema.validate(req.body);

  const isSchoolFound = await User.find({ _id: req.user.userId });

  if (isSchoolFound[0]?.school) {
    throw new CustomError(
      "Already Linked With A School Can't Create New School",
      400
    );
  }

  if (error) {
    // If validation fails, send a 400 Bad Request response with the validation error details
    throw new CustomError(error?.details[0]?.message, 400);
  }

  // Extract school details from the value
  const { name, address, contactDetails } = value;

  // Create a new school instance
  const newSchool = await School.create({
    name,
    address,
    contactDetails,
  });

  await User.findByIdAndUpdate(req.user.userId, {
    school: newSchool._id,
  });

  // Return a success message along with the added school
  res
    .status(201)
    .json({ message: 'School created successfully', school: newSchool });
};

const additionalSchoolDetails = async (req, res) => {
  const userFound = await User.find({ _id: req.user._id });
  const { error, value } = schoolDetailsSchema.validate(req.body);

  if (error) {
    // If validation fails, send a 400 Bad Request response with the validation error details
    throw new CustomError(error?.details[0]?.message, 400);
  }

  const { ageRange, establishedDate, facilities, tuitionFees, dailySchedule } =
    value;

  // Find the school by ID
  const school = await School.findById(userFound[0].school);
  if (!school) {
    throw new CustomError('School Not Found', 404);
  }

  if (ageRange) school.ageRange = ageRange;
  if (establishedDate) school.establishedDate = establishedDate;
  if (facilities) school.facilities = facilities;
  if (tuitionFees) school.tuitionFees = tuitionFees;
  if (dailySchedule) school.dailySchedule = dailySchedule;

  // Save the updated school
  await school.save();

  res
    .status(200)
    .json({ message: 'School details updated successfully', school });
};
// Controller for retrieving all schools
const getAllSchools = async (req, res) => {
  try {
    // Retrieve all schools from the database
    const schools = await School.find();

    // Return the list of schools
    res.status(200).json({ schools });
  } catch (error) {
    // Handle any errors
    res
      .status(500)
      .json({ message: 'Failed to fetch schools', error: error.message });
  }
};

// Controller for updating a school
const updateSchool = async (req, res) => {
  try {
    // Extract school ID and update details from the request body
    const { id } = req.query;
    const updateData = req.body;

    // Update the school in the database
    const updatedSchool = await School.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    // Return a success message along with the updated school
    res
      .status(200)
      .json({ message: 'School updated successfully', school: updatedSchool });
  } catch (error) {
    // Handle any errors
    res
      .status(500)
      .json({ message: 'Failed to update school', error: error.message });
  }
};

const generateInviteCode = async (req, res) => {
  try {
    const { inviteCode } = req.body;
    const { user } = req;
    const schoolId = user.school;

    const updatedSchool = await School.findByIdAndUpdate(
      schoolId,
      { inviteCode: inviteCode },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: 'InviteCode  Updated', invite: updatedSchool });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const joinbyInviteCode = async (req, res) => {
  // get inviteCode
  const user = req.user;
  const inviteCode = req.body.inviteCode;

  if (!inviteCode) {
    throw new CustomError('invite Code invalid Or Not Found');
  }

  const pipline = [
    {
      $match: { inviteCode: inviteCode },
    },
  ];

  const foundSchool = await School.aggregate(pipline);
  if ((foundSchool == [])) {
    throw new CustomError("invalid Invite Code Or It's Changed");
  }

  const updateUserSchool = {};
  updateUserSchool[user.role] = user._id;
  const schoolUpdated = await School.findByIdAndUpdate(
    foundSchool[0]._id,
    { $push: updateUserSchool },
    { new: true }
  );

  const userUpdated = await User.findByIdAndUpdate(
    user._id,
    { school: foundSchool[0]._id },
    { new: true }
  );
  // add school id to user(parent and teacher)
  // if school not found
  res.status(200).json(schoolUpdated);
  
};

module.exports = {
  createSchool,
  getAllSchools,
  updateSchool,
  generateInviteCode,
  joinbyInviteCode,
  additionalSchoolDetails,
};
