exports.allowRoles = (...roles) => (req, res, next) => {
  if (req.session && roles.includes(req.session.role)) {
    return next();
  }
  res.status(403).send('Forbidden: You do not have access');
};
