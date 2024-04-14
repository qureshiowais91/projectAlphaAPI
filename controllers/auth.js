const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const generateToken = require('../util/GenrateJWT.js');
const { main } = require("../util/nodeMailer")

// Define the register function
async function register(req, res) {
    try {
        const { email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            role
        });

        newUser.save();

        main(email).catch(console.error);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Define the login function
async function login(req, res) {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = generateToken({ userId: user._id, email: user.email }, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Export all functions
module.exports = {
    register,
    login
};
