const express = require('express');
const router = express.Router();
const { markAttendance, viewAttendance } = require('../controllers/attendancecontroller');
const { protect } = require('../middleware/authmiddleware');
const { teacherOnly } = require('../middleware/rolemiddleware');

router.post('/', protect, teacherOnly, markAttendance);
router.get('/', protect, viewAttendance);

module.exports = router;
