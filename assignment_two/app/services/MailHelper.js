const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS
  },
   tls: {
    rejectUnauthorized: false
  }
});

async function sendInvitation(email, generatedPassword) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Your account has been created',
      text: `Welcome!\nEmail: ${email}\nPassword: ${generatedPassword}\nLogin: http://localhost:3000/login`
    });
    console.log('📧 Invitation sent to', email);
  } catch (error) {
    console.error(' Email sending failed:', error.message);
  }
}

module.exports = sendInvitation;
