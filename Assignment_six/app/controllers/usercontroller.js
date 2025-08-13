const User = require('../models/user');

class UserController {
  async getProfile(req, res) {
    res.json(req.user);
  }

  async editProfile(req, res) {
    try {
      const { name, contactInfo } = req.body;
      const profilePic = req.file ? req.file.path : req.user.profilePic;

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { name, contactInfo, profilePic },
        { new: true }
      );

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async listUsers(req, res) {
    try {
      const { role } = req.query;
      const users = await User.find(role ? { role } : {});
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new UserController();
