const User = require('../models/user');
const bcrypt = require('bcrypt');
const sendInvitation = require('../services/MailHelper');

class UserController {
  async listUsers(req, res) {
    const users = await User.find().lean();
    res.render('users/list', { users });
  }

  showUserForm(req, res) {
    res.render('users/form', { user: {}, error: null });
  }

  async saveUser(req, res) {
    try {
      const { name, email, role } = req.body;
      const plainPwd = Math.random().toString(36).slice(-8);
      const hashed = await bcrypt.hash(plainPwd, 10);

      const user = new User({
        name,
        email: email.toLowerCase().trim(),
        role,
        password: hashed,
        isActive: true,
      });
      await user.save();

      await sendInvitation(user.email, plainPwd);
      res.redirect('/users/list');
    } catch (err) {
      console.error(err);
      res.render('users/form', { user: req.body, error: 'User creation failed.' });
    }
  }

  async editUser(req, res) {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.redirect('/users/list');
    res.render('users/form', { user, error: null });
  }

  async updateUser(req, res) {
    const { name, role, isActive } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
      name,
      role,
      isActive: isActive === 'on',
    });
    res.redirect('/users/list');
  }

  async deleteUser(req, res) {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users/list');
  }
}

module.exports = new UserController();
