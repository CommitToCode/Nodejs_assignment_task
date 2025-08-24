const express = require('express');
const router = express.Router();
const { markAttendance, viewAttendance } = require('../controllers/attendancecontroller');
const { protect } = require('../middleware/authmiddleware');
const { teacherOnly } = require('../middleware/rolemiddleware');

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Attendance management routes
 */

/**
 * @swagger
 * /:
 *   post:
 *     tags: [Attendance]
 *     summary: Mark attendance (Teacher only)
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
 *               date: { type: string, format: date }
 *               status: { type: string, enum: [present, absent] }
 *             required:
 *               - studentId
 *               - date
 *               - status
 *     responses:
 *       201:
 *         description: Attendance marked
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not teacher)
 */
router.post('/', protect, teacherOnly, markAttendance);

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Attendance]
 *     summary: View attendance (All authenticated users)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance records retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/', protect, viewAttendance);

module.exports = router;
