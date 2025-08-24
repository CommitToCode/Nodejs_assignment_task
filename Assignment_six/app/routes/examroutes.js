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

/**
 * @swagger
 * tags:
 *   name: Exams
 *   description: Exam and result management routes
 */

/**
 * @swagger
 * /:
 *   post:
 *     tags: [Exams]
 *     summary: Create a new exam (Teacher/Admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               courseId: { type: string }
 *               batchId: { type: string }
 *               date: { type: string, format: date }
 *             required:
 *               - title
 *               - courseId
 *               - batchId
 *               - date
 *     responses:
 *       201:
 *         description: Exam created
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/', protect, teacherOrAdmin, createExam);

/**
 * @swagger
 * /marks:
 *   post:
 *     tags: [Exams]
 *     summary: Assign marks to students for an exam (Teacher/Admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               examId: { type: string }
 *               marks: 
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     studentId: { type: string }
 *                     score: { type: number }
 *             required:
 *               - examId
 *               - marks
 *     responses:
 *       200:
 *         description: Marks assigned
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/marks', protect, teacherOrAdmin, assignMarks);

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Exams]
 *     summary: Fetch exam results (All authenticated users)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exam results
 *       401:
 *         description: Unauthorized
 */
router.get('/', protect, fetchResults);

/**
 * @swagger
 * /{id}:
 *   put:
 *     tags: [Exams]
 *     summary: Update exam details (Teacher/Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exam ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               date: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Exam updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put('/:id', protect, teacherOrAdmin, updateExam);

module.exports = router;
