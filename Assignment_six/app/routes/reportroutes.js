const express = require('express');
const router = express.Router();
const {
  courseEnrollments,
  batchReport,
  studentReport,
  sendReportEmail
} = require('../controllers/reportcontroller');
const { protect } = require('../middleware/authmiddleware');
const { teacherOrAdmin } = require('../middleware/rolemiddleware');

router.get('/courses', protect, courseEnrollments);
router.get('/batch/:batchId', protect, teacherOrAdmin, batchReport);
router.get('/student/:studentId', protect, teacherOrAdmin, studentReport);
router.post('/student/:studentId/email', protect, teacherOrAdmin, sendReportEmail)
router.post('/send', protect, teacherOrAdmin, sendReportEmail);

module.exports = router;
