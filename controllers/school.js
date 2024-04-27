const School = require('../models/School');
const User = require("../models/User");

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
        const { inviteCode } = req.body;
        const { user } = req
        const schoolId = user.school

        const updatedSchool = await School.findByIdAndUpdate(schoolId, { inviteCode: inviteCode }, { new: true })

        return res.status(200).json({ message: 'InviteCode  Updated', invite: updatedSchool });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};


const joinbyInviteCode = async (req, res) => {
    try {
        // get inviteCode
        const user = req.user;
        const inviteCode = req.body.inviteCode;
        // search school module for this inviteCode

        const pipline = [
            {
                $match: { 'inviteCode': inviteCode }
            }
        ]

        const foundSchool = await School.aggregate(pipline);

        const updateUserSchool = {};
        updateUserSchool[user.role] = user._id;
        const schoolUpdated = await School.findByIdAndUpdate(foundSchool[0]._id, { $push: updateUserSchool}, { new: true });

        console.log(updateUserSchool, "12312312312");

        // console.log(req.user)
        // console.log(foundSchool)
        // if school found
        // update school with teacher or parent
        const userUpdated = await User.findByIdAndUpdate(user._id, { school: foundSchool[0]._id }, { new: true });
        // add school id to user(parent and teacher) 
        // if school not found
        res.status(200).json(schoolUpdated)

        if (foundSchool == []) {
            res.status(200).json({ "Error": "Invalid Invite Code Or Code is Changed!!" })
        }
        // return invite code  does not exist
    } catch (error) {

    }
}

module.exports = {
    createSchool,
    getAllSchools,
    updateSchool,
    generateInviteCode,
    joinbyInviteCode,
};
