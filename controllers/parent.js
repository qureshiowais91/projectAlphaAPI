const Parent = require('../models/Parent');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

// Controller for adding a parent's child
const addChild = async (req, res) => {
    try {
        // Extract child details from the request body
        const { name, age, grade } = req.body;

        // Create a new student instance
        const newStudent = new Student({
            name,
            age,
            grade
        });

        // Save the new student to the database
        await newStudent.save();

        // Retrieve parent details from the request (assuming it's authenticated)
        const parentId = req.user._id; // Assuming user ID is available in req.user

        // Find the parent by ID
        const parent = await Parent.findById(parentId);

        // Add the new student to the parent's list of children
        parent.children.push(newStudent._id);

        // Save the updated parent
        await parent.save();

        // Return a success message along with the added child
        res.status(201).json({ message: 'Child added successfully', child: newStudent });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Failed to add child', error: error.message });
    }
};

// Controller for assigning a child to their teacher
const assignChildToTeacher = async (req, res) => {
    try {
        // Extract child ID and teacher ID from the request body
        const { childId, teacherId } = req.body;

        // Find the child by ID
        const child = await Student.findById(childId);

        // Find the teacher by ID
        const teacher = await Teacher.findById(teacherId);

        // Assign the child to the teacher
        teacher.students.push(childId);

        // Save the updated teacher
        await teacher.save();

        // Return a success message
        res.status(200).json({ message: 'Child assigned to teacher successfully' });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Failed to assign child to teacher', error: error.message });
    }
};

module.exports = {
    addChild,
    assignChildToTeacher
};
