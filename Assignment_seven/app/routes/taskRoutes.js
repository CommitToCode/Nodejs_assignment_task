const express = require("express");
const {
  addTask,
  editTask,
  deleteTask,
  markTaskCompleted,
  listTasks,
  reorderTasks,
} = require("../controllers/taskController.js");
const { AuthCheck } = require("../middleware/auth");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management routes
 */

/**
 * @swagger
 * /:
 *   post:
 *     tags: [Tasks]
 *     summary: Add a new task
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
 *               dueDate: { type: string, format: date-time }
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Task created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", AuthCheck, addTask);

/**
 * @swagger
 * /{id}:
 *   put:
 *     tags: [Tasks]
 *     summary: Edit an existing task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               dueDate: { type: string, format: date-time }
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", AuthCheck, editTask);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags: [Tasks]
 *     summary: Delete a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", AuthCheck, deleteTask);

/**
 * @swagger
 * /{id}/complete:
 *   patch:
 *     tags: [Tasks]
 *     summary: Mark a task as completed
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task marked as completed
 *       401:
 *         description: Unauthorized
 */
router.patch("/:id/complete", AuthCheck, markTaskCompleted);

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Tasks]
 *     summary: List all tasks with optional filters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter tasks by status (pending/completed)
 *       - in: query
 *         name: dueDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter tasks by due date
 *     responses:
 *       200:
 *         description: List of tasks
 *       401:
 *         description: Unauthorized
 */
router.get("/", AuthCheck, listTasks);

/**
 * @swagger
 * /reorder:
 *   patch:
 *     tags: [Tasks]
 *     summary: Reorder tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of task IDs in new order
 *     responses:
 *       200:
 *         description: Tasks reordered successfully
 *       401:
 *         description: Unauthorized
 */
router.patch("/reorder", AuthCheck, reorderTasks);

module.exports = router;
