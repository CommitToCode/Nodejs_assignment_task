const express = require('express');
const router = express.Router();
const {
  addCourse,
  editCourse,
  deleteCourse,
  listCourses
} = require('../controllers/coursecontroller');
const { protect } = require('../middleware/authmiddleware');
const { adminOnly } = require('../middleware/rolemiddleware');

router.post('/', protect, adminOnly, addCourse);
router.put('/:id', protect, adminOnly, editCourse);
router.delete('/:id', protect, adminOnly, deleteCourse);
router.get('/', protect, listCourses);

module.exports = router;
