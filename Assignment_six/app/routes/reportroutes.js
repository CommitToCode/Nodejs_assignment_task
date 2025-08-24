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

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Reports and analytics routes
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     tags: [Reports]
 *     summary: Get course enrollments (All authenticated users)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of courses with enrollment counts
 *       401:
 *         description: Unauthorized
 */
router.get('/courses', protect, courseEnrollments);

/**
 * @swagger
 * /batch/{batchId}:
 *   get:
 *     tags: [Reports]
 *     summary: Get report for a specific batch (Teacher/Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: batchId
 *         required: true
 *         schema:
 *           type: string
 *         description: Batch ID
 *     responses:
 *       200:
 *         description: Batch report
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/batch/:batchId', protect, teacherOrAdmin, batchReport);

/**
 * @swagger
 * /student/{studentId}:
 *   get:
 *     tags: [Reports]
 *     summary: Get report for a specific student (Teacher/Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student report
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/student/:studentId', protect, teacherOrAdmin, studentReport);

/**
 * @swagger
 * /student/{studentId}/email:
 *   post:
 *     tags: [Reports]
 *     summary: Send report to a student via email (Teacher/Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *     responses:
 *       200:
 *         description: Report sent via email
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/student/:studentId/email', protect, teacherOrAdmin, sendReportEmail);

/**
 * @swagger
 * /send:
 *   post:
 *     tags: [Reports]
 *     summary: Send a report (Teacher/Admin)
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
 *               email: { type: string }
 *     responses:
 *       200:
 *         description: Report sent
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/send', protect, teacherOrAdmin, sendReportEmail);

module.exports = router;
