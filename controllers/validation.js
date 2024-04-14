const User = require('../models/User');
const { main } = require("../util/nodeMailer")

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    // Check in Email
    console.log(email);
    const found = await User.find({ email: email });
    console.log(found);

    if (found[0].email === email) {
      main(email).catch(console.error);
    }

    res.status(200).json({ ok: false });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  sendOtp,
};
