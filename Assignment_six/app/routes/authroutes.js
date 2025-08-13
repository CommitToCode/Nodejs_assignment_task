const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/signup', AuthController.signup);
router.post('/verify-email', AuthController.verifyEmail);
router.post('/login', AuthController.login);

module.exports = router;
