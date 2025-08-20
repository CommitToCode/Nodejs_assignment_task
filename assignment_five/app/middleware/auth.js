const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/role');

module.exports = async function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).populate('role');
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role?.name || 'User',
      isVerified: user.isVerified
    };
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
