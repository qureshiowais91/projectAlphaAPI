const Classroom = require('../models/Classroom');

// Admin will Create New Class
// And Also Share InviteCode For Each Class
const createClassroom = async (req, res) => {
    try {
        // Extract data from the request body
        const school = req.user.school._id;
        const { classroom } = req.body;

        // Create a new classroom directly using the create method
        const newClassroom = await Classroom.create({
            classroom: classroom,
            school: school, // Assign the school's ObjectId to the classroom
        });

        res
            .status(201)
            .json({ newClassroom, message: 'Classroom created successfully' });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getClassroom = async (req, res) => {
    try {
        const classrooms = await Classroom.find({});
        res.status(200).json(classrooms);
    } catch (err) { }
};

// when parent adds kids then only add to classroom also
const joinClassroom = async (req, res) => {
    try {
        const { classroomId, studentId } = req.body;
        if(!classroomId && !studentId){
            throw new Error("Classroom or Student ID Missing");
        }
        const updatedClassroom = await Classroom.findByIdAndUpdate(
            classroomId,
            { $push: { students: studentId } },
            { new: true }
        );
        console.log(updatedClassroom,classroomId,studentId)
        res.status(201).json({ classroom: updatedClassroom, message: "Classroom Joined Successfully" })
    } catch (error) { 
        res.status(500).json({ message: error.message })

    }
};

module.exports = {
    createClassroom,
    getClassroom,
    joinClassroom
};
