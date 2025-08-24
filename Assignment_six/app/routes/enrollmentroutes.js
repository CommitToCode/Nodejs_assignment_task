const express = require('express');
const router = express.Router();
const { enrollStudent } = require('../controllers/enrollmentcontroller');
const { protect } = require('../middleware/authmiddleware');

/**
 * @swagger
 * tags:
 *   name: Enrollment
 *   description: Student enrollment routes
 */

/**
 * @swagger
 * /:
 *   post:
 *     tags: [Enrollment]
 *     summary: Enroll a student in a course/batch
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId: { type: string }
 *               courseId: { type: string }
 *               batchId: { type: string }
 *             required:
 *               - studentId
 *               - courseId
 *               - batchId
 *     responses:
 *       201:
 *         description: Student enrolled successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', protect, enrollStudent);

module.exports = router;
