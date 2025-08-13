const express = require('express');
const router = express.Router();
const {
  createExam,
  assignMarks,
  fetchResults,
  updateExam
} = require('../controllers/examcontroller');
const { protect } = require('../middleware/authmiddleware');
const { teacherOrAdmin } = require('../middleware/rolemiddleware');

router.post('/', protect, teacherOrAdmin, createExam);
router.post('/marks', protect, teacherOrAdmin, assignMarks);
router.get('/', protect, fetchResults);
router.put('/:id', protect, teacherOrAdmin, updateExam);

module.exports = router;
