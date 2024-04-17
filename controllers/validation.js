const User = require('../models/User');
const { sendResetPasswordEmail } = require('../util/resetPassword');
const Redis = require("ioredis");


const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    // Check in Email
    console.log(email);
    const found = await User.find({ email: email });
    console.log(found);

    if (found[0].email === email) {
      sendResetPasswordEmail(email).catch(console.error);
    }

    res.status(200).json({ ok: false });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const validateOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const found = await User.find({ email: email });

    if (found[0].email !== email) {
      throw Error("Email Not Found Or Email Invalid")
    }
    
    const { REDIS_URL } = process.env;
    const renderRedis = new Redis(REDIS_URL);

    const result = await renderRedis.get(email);

    if (result !== otp) {
      throw Error("Invalid OTP")
    }

    res.status(200).json({ "Validated Email": true })

  } catch (error) {
    console.error(error)
    res.status(200).json({ "Validated Email": false })
  }
}

module.exports = {
  sendOtp,
  validateOTP
};
