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

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management routes
 */

/**
 * @swagger
 * /:
 *   post:
 *     tags: [Courses]
 *     summary: Add a new course (Admin only)
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
 *               description: { type: string }
 *             required:
 *               - title
 *               - description
 *     responses:
 *       201:
 *         description: Course added
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/', protect, adminOnly, addCourse);

/**
 * @swagger
 * /{id}:
 *   put:
 *     tags: [Courses]
 *     summary: Edit a course (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *     responses:
 *       200:
 *         description: Course updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put('/:id', protect, adminOnly, editCourse);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags: [Courses]
 *     summary: Delete a course (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete('/:id', protect, adminOnly, deleteCourse);

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Courses]
 *     summary: Get list of courses (All authenticated users)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of courses
 *       401:
 *         description: Unauthorized
 */
router.get('/', protect, listCourses);

module.exports = router;
