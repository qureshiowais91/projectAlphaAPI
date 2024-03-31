const Student = require('../models/Student');

// Controller for GET /api/students
const getAllStudents = async (req, res) => {
    try {
        // Retrieve all students from the database
        const students = await Student.find();

        // Return the list of students
        res.status(200).json({ students });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Failed to fetch students', error: error.message });
    }
};

// Controller for POST /api/students
const addStudent = async (req, res) => {
    try {
        // Extract student details from the request body
        const { name, age, grade } = req.body;

        // Create a new student instance
        const newStudent = new Student({
            name,
            age,
            grade
        });

        // Save the new student to the database
        await newStudent.save();

        // Return a success message along with the added student
        res.status(201).json({ message: 'Student added successfully', student: newStudent });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Failed to add student', error: error.message });
    }
};

module.exports = {
    getAllStudents,
    addStudent
};
