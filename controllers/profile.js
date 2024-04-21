const User = require('../models/User');

// Controller function for the getProfile endpoint
async function getProfile(req, res) {
    const userId = req.user.userId;

    try {
        // Find the user by userId and populate the 'school' field
        const user = await User.findById(userId).populate('school');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the user profile, including the populated 'school' field
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getProfile
};
