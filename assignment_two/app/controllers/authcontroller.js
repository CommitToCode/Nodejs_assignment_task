const User = require('../models/user');
const bcrypt = require('bcrypt');

class AuthController {
  async loginForm(req, res) {
    res.render('login', { error: null });
  }

  async login(req, res) {
    try {
      const email = req.body.email.toLowerCase().trim();
      const password = req.body.password;
      const user = await User.findOne({ email });

      if (!user || !user.isActive) {
        return res.render('login', { error: 'Invalid email or password' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.render('login', { error: 'Invalid email or password' });
      }

      req.session.userId = user._id;
      req.session.role = user.role;
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.render('login', { error: 'Login failed. Try again.' });
    }
  }

  async logout(req, res) {
    req.session.destroy(err => {
      return res.redirect('/');
    });
  }
}

module.exports = new AuthController();
