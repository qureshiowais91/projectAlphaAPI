const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const generateToken = require('../util/GenrateJWT.js');
const { sendOTP } = require("../util/welcomeMail.js")
// const checkForProfanity =require("../util/profanity.js");

// Define the register function
async function register(req, res) {
    try {
        const { email, password, phonenumber, role } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            phonenumber,
            role
        });

        sendOTP(email).catch(console.error);

        const token = generateToken({ userId: newUser._id, email: email, role: role }, { expiresIn: '1h' });
        res.status(200).json({ isAuth: true, token, message: "Loggedin", role: role });
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
        // check user if exist
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // check if user valid    
        if (!user.verified) {
            return res.status(300).json({ message: 'Contact Developer To Get Verified' });
        }

        // Validate Password 
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = generateToken({ userId: user._id, email: user.email, role: user.role }, { expiresIn: '1h' });
        res.status(200).json({ isAuth: true, token, message: "Loggedin", role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ isAuth: false, token: "false", message: "Check ID PASSWORD" });
    }
}

// Export all functions
module.exports = {
    register,
    login
};
