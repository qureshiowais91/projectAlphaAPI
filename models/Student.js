const studentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to User model
});


const Student = mongoose.model('Student', studentSchema);

module.exports = {
    Student
};