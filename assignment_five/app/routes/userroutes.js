const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { getProfile, updateProfile } = require('../controllers/usercontroller');

router.get('/me', auth, getProfile);                              
router.put('/me', auth, upload.single('profileImage'), updateProfile); 

module.exports = router;
