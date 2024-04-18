const User = require('../models/User');
const Teacher = require('../models/Teacher'); // Import the Teacher model
const Parent = require('../models/Parent');
const School = require("../models/School")
// Import the Parent model
// Import other models as needed

// Middleware to populate the user's associated profile
const populateProfile = async (req, res, next) => {
    try {
        // Retrieve the user document
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Determine the profile model based on the user's role
        let profileModel;
        switch (user.role) {
            case 'teacher':
                profileModel = Teacher;
                break;
            case 'parent':
                profileModel = Parent;
                break;
            case 'admin':
                profileModel = School;
                break;
            // Add other cases for different roles and models as needed
            default:
                return res.status(400).json({ message: 'Invalid user role' });
        }

        // Retrieve the associated profile document using the profile_id
        const profile = await profileModel.findById(user.profile_id);

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Attach the profile data to the request object for use in subsequent middleware or route handlers
        req.profile = profile;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = populateProfile;
