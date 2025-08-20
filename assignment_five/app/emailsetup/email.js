const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendVerificationEmail({ to, token }) {
  const link = `${process.env.BASE_URL}/api/auth/verify?token=${token}`;
  const html = `
    <h2>Verify your account</h2>
    <p>Click the link below to verify your email:</p>
    <p><a href="${link}" target="_blank">${link}</a></p>
  `;
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Verify your Movie Booking account',
    html
  });
}

async function sendBookingSummary({ to, htmlTable }) {
  const html = `
    <h2>Your Booking Summary</h2>
    ${htmlTable}
    <p>Thank you for using Movie Booking!</p>
  `;
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Your Movie Booking Summary',
    html
  });
}

module.exports = { sendVerificationEmail, sendBookingSummary };
