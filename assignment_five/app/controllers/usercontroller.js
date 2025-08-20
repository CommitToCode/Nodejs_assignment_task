const User = require('../models/user');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('role').select('-password');
    res.json(user);
  } catch (e) { next(e); }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (req.file) {
      update.profileImage = req.file.path.replace(/\\/g,'/'); 
    }
    const user = await User.findByIdAndUpdate(req.user.id, update, { new: true }).select('-password');
    res.json(user);
  } catch (e) { next(e); }
};
