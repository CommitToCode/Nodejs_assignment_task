const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const upload = require('../middlewares/upload');
const { getProfile, updateProfile } = require('../controllers/usercontroller');

router.get('/profile', auth, getProfile);
router.put('/profile', auth, upload.single('image'), updateProfile);

module.exports = router;
