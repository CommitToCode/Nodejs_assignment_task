const router = require('express').Router();
const { register, verify, login } = require('../controllers/authcontroller');

router.post('/register', register);       
router.get('/verify', verify);             
router.post('/login', login);              

module.exports = router;
