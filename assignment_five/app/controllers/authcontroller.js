const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Role = require('../models/role');
const User = require('../models/user');
const { sendVerificationEmail } = require('../emailsetup/email');

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role?.name || 'User' }, process.env.JWT_SECRET, { expiresIn: '7d' });
}


async function ensureRoles() {
  const roles = await Role.find({});
  const haveUser = roles.some(r => r.name === 'User');
  const haveAdmin = roles.some(r => r.name === 'Admin');
  if (!haveUser) await Role.create({ name: 'User' });
  if (!haveAdmin) await Role.create({ name: 'Admin' });
}

exports.register = async (req, res, next) => {
  try {
    await ensureRoles(); // still ensures roles exist in DB

    const { name, email, password, role } = req.body; // ⬅ added role
    if (!email || !password) return res.status(400).json({ message: 'Email & password required' });

    // If role is provided, use it, else default = User
    const roleDoc = await Role.findOne({ name: role || 'User' });
    if (!roleDoc) return res.status(400).json({ message: 'Invalid role' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const token = crypto.randomBytes(32).toString('hex');
    const user = await User.create({
      name: name || '',
      email,
      password,
      role: roleDoc._id,   // ⬅ store role from request
      verificationToken: token,
      verificationExpires: new Date(Date.now() + 1000 * 60 * 60 * 24)
    });

    await sendVerificationEmail({ to: email, token });
    res.status(201).json({ message: 'Registered. Check your email to verify.' });
  } catch (e) { next(e); }
};

exports.verify = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: 'Missing token' });

    const user = await User.findOne({
      verificationToken: token,
      verificationExpires: { $gt: new Date() }
    });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.isVerified = true;
    user.verificationToken = '';
    user.verificationExpires = null;
    await user.save();

    res.json({ message: 'Email verified. You can now log in.' });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('role');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    if (!user.isVerified) return res.status(403).json({ message: 'Please verify your email first' });
    const token = signToken(user);
    res.json({
      token,
      user: {
        id: user._id, email: user.email, name: user.name,
        role: user.role?.name || 'User', profileImage: user.profileImage
      }
    });
  } catch (e) { next(e); }
};
