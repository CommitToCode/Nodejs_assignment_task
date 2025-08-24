const express = require("express");
const {
  setReminder,
  editReminder,
  deleteReminder,
} = require("../controllers/reminderController");
const { AuthCheck } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reminders
 *   description: Reminder management routes
 */

/**
 * @swagger
 * /:
 *   post:
 *     tags: [Reminders]
 *     summary: Set a new reminder
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
 *               time: { type: string, format: date-time }
 *             required:
 *               - title
 *               - time
 *     responses:
 *       201:
 *         description: Reminder set successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", AuthCheck, setReminder);

/**
 * @swagger
 * /{id}:
 *   put:
 *     tags: [Reminders]
 *     summary: Edit an existing reminder
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reminder ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               time: { type: string, format: date-time }
 *     responses:
 *       200:
 *         description: Reminder updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", AuthCheck, editReminder);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags: [Reminders]
 *     summary: Delete a reminder
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reminder ID
 *     responses:
 *       200:
 *         description: Reminder deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", AuthCheck, deleteReminder);

module.exports = router;
