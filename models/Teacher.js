const teacherSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to User model
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = { Teacher};
