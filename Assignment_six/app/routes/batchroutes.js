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

/**
 * @swagger
 * tags:
 *   name: Batches
 *   description: Batch management routes
 */

/**
 * @swagger
 * /:
 *   post:
 *     tags: [Batches]
 *     summary: Add a new batch (Teacher/Admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               startDate: { type: string, format: date }
 *               endDate: { type: string, format: date }
 *             required:
 *               - name
 *               - startDate
 *               - endDate
 *     responses:
 *       201:
 *         description: Batch added
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/', protect, teacherOrAdmin, addBatch);

/**
 * @swagger
 * /assign:
 *   post:
 *     tags: [Batches]
 *     summary: Assign students to a batch (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               batchId: { type: string }
 *               studentIds:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - batchId
 *               - studentIds
 *     responses:
 *       200:
 *         description: Students assigned
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/assign', protect, adminOnly, assignStudents);

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Batches]
 *     summary: Get list of batches (All authenticated users)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of batches
 *       401:
 *         description: Unauthorized
 */
router.get('/', protect, listBatches);

/**
 * @swagger
 * /{id}:
 *   put:
 *     tags: [Batches]
 *     summary: Update a batch (Teacher/Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Batch ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               startDate: { type: string, format: date }
 *               endDate: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Batch updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put('/:id', protect, teacherOrAdmin, updateBatch);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags: [Batches]
 *     summary: Delete a batch (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Batch ID
 *     responses:
 *       200:
 *         description: Batch deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete('/:id', protect, adminOnly, deleteBatch);

module.exports = router;
