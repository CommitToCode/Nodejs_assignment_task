const express = require("express");
const {
  dailySummary,
  weeklySummary,
  taskStatistics,
} = require("../controllers/reportController");
const { AuthCheck } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Task and activity reporting routes
 */

/**
 * @swagger
 * /daily:
 *   get:
 *     tags: [Reports]
 *     summary: Get daily summary
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daily summary data
 *       401:
 *         description: Unauthorized
 */
router.get("/daily", AuthCheck, dailySummary);

/**
 * @swagger
 * /weekly:
 *   get:
 *     tags: [Reports]
 *     summary: Get weekly summary
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Weekly summary data
 *       401:
 *         description: Unauthorized
 */
router.get("/weekly", AuthCheck, weeklySummary);

/**
 * @swagger
 * /stats:
 *   get:
 *     tags: [Reports]
 *     summary: Get task statistics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task statistics data
 *       401:
 *         description: Unauthorized
 */
router.get("/stats", AuthCheck, taskStatistics);

module.exports = router;
