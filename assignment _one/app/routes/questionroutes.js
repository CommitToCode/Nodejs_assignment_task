

const express = require("express");
 const router = express.Router(); 
 const auth = require("../middlewares/authmiddleware");
  const { listQuestionsByCategory, searchQuestionWithAnswer, createQuestion } = require("../controllers/questionController");










/**
 * @swagger
 * /questions/questioncreate:
 *   post:
 *     tags:
 *       - Questions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - options
 *               - correctAnswer
 *               - categories
 *             properties:
 *               text:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               correctAnswer:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: 
 *       400:
 *         description: 
 *       401:
 *         description: 
 */

/**
 * @swagger
 * /questions/category/{id}:
 *   get:
 *     tags:
 *       - Questions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 
 *       400:
 *         description: 
 *       401:
 *         description: 
 */

/**
 * @swagger
 * /questions/search:
 *   get:
 *     tags:
 *       - Questions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: question
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: timezone
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 
 *       400:
 *         description: 
 *       401:
 *         description: 
 */
router.post("/questioncreate", auth, createQuestion);
router.get("/category/:id", auth, listQuestionsByCategory);
router.get("/search", auth, searchQuestionWithAnswer);

module.exports = router;
