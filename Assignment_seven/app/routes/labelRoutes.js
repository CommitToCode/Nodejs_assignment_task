const express = require("express");
const { addLabel, listLabels } = require("../controllers/labelController.js");
const { AuthCheck } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Labels
 *   description: Label management routes
 */

/**
 * @swagger
 * /:
 *   post:
 *     tags: [Labels]
 *     summary: Add a new label
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
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Label added successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", AuthCheck, addLabel);

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Labels]
 *     summary: List all labels
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of labels
 *       401:
 *         description: Unauthorized
 */
router.get("/", AuthCheck, listLabels);

module.exports = router;
