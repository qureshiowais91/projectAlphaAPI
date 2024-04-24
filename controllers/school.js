const School = require('../models/School');
const User = require("../models/User")
// Controller for creating a new school
const createSchool = async (req, res) => {
    try {
        // Extract school details from the request body
        const { name, address, contactDetails } = req.body;

        // Create a new school instance
        const newSchool = new School({
            name,
            address,
            contactDetails
        });

        // Save the new school to the database  
        await newSchool.save();

        const check = await User.findByIdAndUpdate(req.user.userId, {
            school: newSchool._id
        });

        console.log(check, req.user)
        // Return a success message along with the added school
        res.status(201).json({ message: 'School created successfully', school: newSchool });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Failed to create school', error: error.message });
    }
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
        res.status(500).json({ message: 'Failed to fetch schools', error: error.message });
    }
};

// Controller for updating a school
const updateSchool = async (req, res) => {
    try {
        // Extract school ID and update details from the request body
        const { id } = req.query;
        const updateData = req.body;

        // Update the school in the database
        const updatedSchool = await School.findByIdAndUpdate(id, updateData, { new: true });

        // Return a success message along with the updated school
        res.status(200).json({ message: 'School updated successfully', school: updatedSchool });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Failed to update school', error: error.message });
    }
};

const generateInviteCode = async (req, res) => {
    try {
        const { codeLength } = req.query;

        if (codeLength < 6 || codeLength > 20) {
             throw Error('invite code must consist of minimum 6 and maximum 20 characters only');
        }

        const charset = process.env.InviteChar;
        let code = '';

        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            code += charset[randomIndex];
        }

        return res.status(200).json({ message: 'InviteCode', invite: code });
    } catch (error) {
         res.status(500).json({ message: error });
    }
};

// Example usage:
// Assuming you have an Express app set up and listening on a specific route
// app.get('/generateInviteCode', generateInviteCode);


// Controller for deleting a school
// const deleteSchool = async (req, res) => {
//     try {
//         // Extract school ID from the request parameters
//         const { id } = req.query;

//         // Delete the school from the database
//         await School.findByIdAndDelete(id);

//         // Return a success message
//         res.status(200).json({ message: 'School deleted successfully' });
//     } catch (error) {
//         // Handle any errors
//         res.status(500).json({ message: 'Failed to delete school', error: error.message });
//     }
// };

module.exports = {
    createSchool,
    getAllSchools,
    updateSchool,
    generateInviteCode
};
