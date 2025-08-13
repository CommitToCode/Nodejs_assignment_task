const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const { submitAnswer } = require('../controllers/answercontroller');


router.post('/submit', auth, submitAnswer);

module.exports = router;
