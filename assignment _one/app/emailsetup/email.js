const nodemailer = require('nodemailer');

exports.sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const link = `http://localhost:${process.env.PORT}/api/auth/verify/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Email Verification',
    html: `
      <h2>Email Verification</h2>
      <p>Your verification token is: <strong>${token}</strong></p>
      <p>Click <a href="${link}">here</a> to verify your email directly.</p>
      <p>Or manually copy and paste this URL into your browser:</p>
      <p>${link}</p>
    `
  });
};
