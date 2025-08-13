const express = require('express');
const router = express.Router();
const { enrollStudent } = require('../controllers/enrollmentcontroller');
const { protect } = require('../middleware/authmiddleware');

router.post('/', protect, enrollStudent);

module.exports = router;
