const nodemailer = require('nodemailer');
const Redis = require("ioredis");

async function sendResetPasswordEmail(email) {
  const OTP = Math.floor(100000 + Math.random() * 900000);
  const { REDIS_URL } = process.env;
  console.log(REDIS_URL);

  const renderRedis = new Redis(REDIS_URL);

  renderRedis.set(email, OTP);

  renderRedis.get(email).then((result) => {
    console.log(result);
  });

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'projectalphainfotech@gmail.com',
      pass: process.env.EMAIL_CODE,
    },
  });

  const mailOptions = {
    from: 'projectalphainfotech@gmail.com',
    to: email,
    subject: 'Reset Your Password at Project Alpha Infotech',
    text: `Your One-Time Password (OTP) for resetting your password at Project Alpha Infotech is: ${OTP}`,
    html: `<html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  background-color: #f4f4f4; /* Background color */
                }
                .header {
                  background-color: #007bff;
                  color: #fff;
                  padding: 20px;
                  text-align: center;
                  font-size: 24px;
                }
                .content {
                  padding: 20px;
                  border-radius: 10px; /* Rounded corners */
                  background-color: #fff; /* Content background color */
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Shadow */
                }
              </style>
            </head>
            <body>
              <div class="header">Reset Your Password at Project Alpha Infotech</div>
              <div class="content">
                <p style="color: #007bff;">Dear User,</p>
                <p style="color: #333;">Your One-Time Password (OTP) for resetting your password at Project Alpha Infotech is: <strong>${OTP}</strong></p>
              </div>
            </body>
          </html>`
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Reset password email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending reset password email:', error);
  }
}

module.exports = { sendResetPasswordEmail };
