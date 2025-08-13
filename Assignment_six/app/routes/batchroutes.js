const express = require('express');
const router = express.Router();
const {
  addBatch,
  assignStudents,
  listBatches,
  updateBatch,
  deleteBatch
} = require('../controllers/batchcontroller');
const { protect } = require('../middleware/authmiddleware');
const { adminOnly, teacherOrAdmin } = require('../middleware/rolemiddleware');

router.post('/', protect, teacherOrAdmin, addBatch);
router.post('/assign', protect, adminOnly, assignStudents);
router.get('/', protect, listBatches);
router.put('/:id', protect, teacherOrAdmin, updateBatch);
router.delete('/:id', protect, adminOnly, deleteBatch);

module.exports = router;
