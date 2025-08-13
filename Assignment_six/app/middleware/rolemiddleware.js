const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access forbidden: insufficient rights' });
    }
    next();
  };
};

// Define wrappers for readability
const adminOnly = allowRoles('Admin');
const teacherOnly = allowRoles('Teacher');
const teacherOrAdmin = allowRoles('Teacher', 'Admin');

module.exports = {
  allowRoles,
  adminOnly,
  teacherOnly,
  teacherOrAdmin,
};
