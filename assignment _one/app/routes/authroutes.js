const router = require('express').Router();
const { register, login, verifyEmail } = require('../controllers/authcontroller');
const upload=require('../middlewares/upload')
router.post('/register', upload.single('image'), register);
router.post('/login',upload.single('image'), login);
router.get('/verify/:token', verifyEmail);

module.exports = router;
