const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendRegistrationEmail = async (to, eventTitle) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Event Registration Successful',
    text: `You have successfully registered for ${eventTitle}`
  });
};