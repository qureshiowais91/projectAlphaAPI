const Teacher = require('../models/Teacher');

// Protected Route as After Login Teacher Will add This Details
// middleware will add id from jwt 
const addTeacher = async (req, res) => {
    try {
        // Extract teacher details from request body
        const { name, subjectTaught, phoneNumber, _id } = req.body;
        console.log(name, _id)
        // Create a new teacher instance
        const newTeacher = new Teacher({
            name,
            subjectTaught,
            phoneNumber,
            user: _id
        });

        // Save the new teacher to the database
        await newTeacher.save();

        res.status(200).json({ message: 'Teacher added successfully', teacher: newTeacher });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add teacher', error: error.message });
    }
};
// list teacher and select teacher who work at my org
const getListTeacher = async (req, res) => {
    try {
        // Fetch all teachers from the database
        const teachers = await Teacher.find();

        res.status(200).json({ teachers });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch teachers', error: error.message });
    }
};

module.exports = {
    addTeacher,
    getListTeacher
};
