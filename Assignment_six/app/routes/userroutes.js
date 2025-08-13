const express = require('express');
const router = express.Router();
const { editProfile, getProfile, listUsers } = require('../controllers/usercontroller');
const { protect } = require('../middleware/authmiddleware');
const { adminOnly } = require('../middleware/rolemiddleware');
const upload = require('../middleware/uploadimage');

router.get('/me', protect, getProfile);
router.put('/me', protect, upload.single('profile_pics'), editProfile);
router.get('/', protect, adminOnly, listUsers);

module.exports = router;
