const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { sendVerificationEmail } = require('../emailsetup/email');

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password, phone } = req.body;
      const image = req.file ? req.file.filename : null;

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        phone,
        password: hashedPassword,
        image,
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '5h' }
      );

      await sendVerificationEmail(newUser.email, token);

      res.status(201).json({
        message: 'Registered successfully. Check email for verification link.'
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async verifyEmail(req, res) {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      await User.findByIdAndUpdate(decoded.id, { verified: true });
      res.json({ message: 'Email verified successfully.' });
    } catch (err) {
      res.status(400).json({ message: 'Invalid or expired token.' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' });
      }

      const user = await User.findOne({ email });
      console.log(' User:', user);

      if (!user) return res.status(404).json({ message: 'User not found' });
      if (!user.verified) return res.status(403).json({ message: 'Email not verified' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '5h' }
      );

      res.json({ message: 'Login successful', token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new AuthController();
