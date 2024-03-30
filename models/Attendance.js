const attendanceSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    attended: { type: Boolean, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }, 
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);  

module.exports = {
    Attendance
};