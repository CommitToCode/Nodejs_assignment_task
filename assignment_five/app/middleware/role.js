module.exports = function requireRole(roleName = 'Admin') {
  return (req, res, next) => {
    if (!req.user || req.user.role !== roleName) {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    next();
  };
};
