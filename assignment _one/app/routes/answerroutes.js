

const express = require('express'); 
const router = express.Router(); 
const auth = require('../middlewares/authmiddleware');
 const { submitAnswer } = require('../controllers/answercontroller');




/**
 * @swagger
 * /answers/submit:
 *   post:
 *     tags:
 *       - Answers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - questionId
 *               - answer
 *             properties:
 *               questionId:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       200:
 *         description: 
 *       400:
 *         description: 
 *       401:
 *         description: 
 */
router.post('/submit', auth, submitAnswer);

module.exports = router;
