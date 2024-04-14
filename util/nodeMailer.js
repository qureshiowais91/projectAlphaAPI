const nodemailer = require('nodemailer');




async function main(email) {

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'projectalphainfotech@gmail.com',
      pass: process.env.EMAIL_CODE,
    },
  });

  console.log(process.env.EMAIL_CODE);

  const info = await transporter.sendMail({
    from: 'projectalphainfotech@gmail.com',
    to: email,
    subject: 'Welcome to Project Alpha Infotech! 🚀',
    text: `Dear User,
  
    Welcome to Project Alpha Infotech! We're thrilled to have you join our community.
    
    At Project Alpha Infotech, we are passionate about revolutionizing the education sector with our innovative solutions.
    
    Our focus lies in two main areas:
    
    1. School Management: Our comprehensive solution streamlines administrative tasks, simplifies communication, and enhances efficiency.
    2. Child Safety: We prioritize the safety of children with advanced systems to monitor and safeguard students, providing peace of mind to parents.
    
    Your input is invaluable to us! Please share your thoughts and suggestions at feedback@projectalphainfotech.com.
    
    We're excited to announce the upcoming testing phase for our new features. Interested in being among the first to try them out? Let us know by replying to this email!
    
    Alongside our core offerings, we provide personalized support and continuous updates to meet your evolving needs.
    
    Explore our platform, engage with fellow members, and make the most of our resources. If you have any questions or need assistance, our support team is here to help.
    
    Welcome aboard!
    
    Best regards,
    The Project Alpha Infotech Team`,
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
                .button {
                  background-color: #4CAF50;
                  border: none;
                  color: white;
                  padding: 15px 32px;
                  text-align: center;
                  text-decoration: none;
                  display: inline-block;
                  font-size: 16px;
                  margin: 4px 2px;
                  cursor: pointer;
                  border-radius: 8px;
                }
              </style>
            </head>
            <body>
              <div class="header">Welcome to Project Alpha Infotech! 🚀</div>
              <div class="content">
                <p style="color: #007bff;">Dear User,</p>
                <p style="color: #333;">Welcome to Project Alpha Infotech! We're thrilled to have you join our community.</p>
                <p style="color: #333;">At Project Alpha Infotech, we are passionate about revolutionizing the education sector with our innovative solutions.</p>
                <p style="color: #333;">Our focus lies in two main areas:</p>
                <ol>
                  <li style="color: #333;">School Management: Our comprehensive solution streamlines administrative tasks, simplifies communication, and enhances efficiency.</li>
                  <li style="color: #333;">Child Safety: We prioritize the safety of children with advanced systems to monitor and safeguard students, providing peace of mind to parents.</li>
                </ol>
                <p style="color: #333;">Your input is invaluable to us! Please send your thoughts and suggestions to <a href="mailto:projectalphainfotech@gmail.com" style="color: #007bff;">projectalphainfotech@gmail.com</a>.</p>
                <p style="color: #333;">We're excited to announce the upcoming testing phase for our new features. Interested in being among the first to try them out? Let us know by replying to this email!</p>
                <p style="color: #333;">Alongside our core offerings, we provide personalized support and continuous updates to meet your evolving needs.</p>
                <p style="color: #333;">Explore our platform, engage with fellow members, and make the most of our resources. If you have any questions or need assistance, our support team is here to help.</p>
                <p style="color: #333;">Welcome aboard!</p>
                <p style="color: #333;">Best regards,<br/>The Project Alpha Infotech Team</p>
              </div>
            </body>
          </html>`
  }
  );
  console.log('Message sent: %s', info.messageId);
}

// main().catch(console.error);

module.exports = { main }