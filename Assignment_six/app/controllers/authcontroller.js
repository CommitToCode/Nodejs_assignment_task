const User = require('../models/user');
const generateToken = require('../middleware/generatetoken');
const transporter = require('../helper/emailsetup');
const crypto = require('crypto');

class AuthController {
  // ---------------- SIGNUP ----------------
  async signup(req, res) {
    try {
      const { name, email, password, role, adminSecretKey } = req.body;
      const allowedRoles = ['Student', 'Teacher', 'Admin'];

      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }

      if (role === 'Admin' && adminSecretKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ message: 'Invalid admin secret key' });
      }

      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const emailVerificationToken = crypto.randomBytes(6).toString('hex').toUpperCase(); // short & readable
      user = new User({
        name,
        email,
        password,
        role,
        emailVerificationToken,
        emailVerificationExpires: Date.now() + 15 * 60 * 1000 // 15 minutes
      });

      await user.save();

      await transporter.sendMail({
        to: email,
        from: process.env.EMAIL_USER,
        subject: 'Your Email Verification Token',
        text: `Your verification token is: ${emailVerificationToken}`,
        html: `<p>Your verification token is: <strong>${emailVerificationToken}</strong></p>`
      });

      res.status(201).json({ message: 'Signup successful. Check your email for the verification token.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // ---------------- VERIFY EMAIL ----------------
  async verifyEmail(req, res) {
    try {
      const { email, token } = req.body;

      const user = await User.findOne({
        email,
        emailVerificationToken: token,
        emailVerificationExpires: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }

      user.isVerified = true;
      user.emailVerificationToken = undefined;
      user.emailVerificationExpires = undefined;
      await user.save();

      res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // ---------------- LOGIN ----------------
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      if (!user.isVerified) {
        return res.status(403).json({ message: 'Email not verified' });
      }

      const token = generateToken(user._id, user.role);

      res.json({
        token,
        user: { id: user._id, name: user.name, email, role: user.role }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new AuthController();
