const User = require('../models/User');
const { sendResetPasswordEmail } = require('../util/resetPassword');
const { renderRedis } = require('../util/welcomeMail');
const CustomError = require('../util/error');
const bcrypt = require('bcryptjs');

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
  const { email, otp } = req.body;
  const found = await User.find({ email: email });

  if (found[0].email !== email) {
    throw Error('Email Not Found Or Email Invalid');
  }

  const result = await renderRedis.get(email);

  if (result !== otp) {
    throw new CustomError('Invalid OTP', 400);
  }

  await renderRedis.set(email, true, 'EX', 1000);

  res.status(200).json({ 'Validated Email': true });
};

const resetpassword = async (req, res) => {
  const { email, newpassword } = req.body;

  const result = await renderRedis.get(email);

  if (!result) {
    throw new CustomError('Fail to Reset Password Try Again With New OTP', 400);
  }

  const userToChangePassword = await User.find({ email: email });

  const hashedPassword = await bcrypt.hash(newpassword, 10);

  await User.findByIdAndUpdate(
    { _id: userToChangePassword[0]._id },
    { password: hashedPassword }
  );

  res.status(200).json({"success":true});
};

module.exports = {
  sendOtp,
  validateOTP,
  resetpassword,
};
