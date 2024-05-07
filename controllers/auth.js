const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const generateToken = require('../util/GenrateJWT.js');
const { sendOTP } = require("../util/welcomeMail.js")
const CustomError = require("../util/error.js")
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

    const { email, password } = req.body;

    if (!email && !password) {
        throw new CustomError("Email or Password Missing", 200);
    }
    const user = await User.findOne({ email });
    // check user if exist
    if (!user) {
        throw new CustomError("User Not Found", 404);
    }

    // check if user valid    
    if (!user.verified) {
        throw new CustomError("Contact Developer", 401);
    }

    // Validate Password 
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        throw new CustomError("Invalid Creds", 401);
    }

    const token = generateToken({ userId: user._id, email: user.email, role: user.role }, { expiresIn: '5h' });
    res.status(200).json({ isAuth: true, token, message: "Loggedin", role: user.role });
}

// Export all functions
module.exports = {
    register,
    login
};
