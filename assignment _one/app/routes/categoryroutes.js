
const express = require("express"); const router = express.Router(); 
const auth = require("../middlewares/authmiddleware"); 
const categoryController = require("../controllers/categoryController");






/**
 * @swagger
 * /categories/create:
 *   post:
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
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
 * /categories/all:
 *   get:
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: 
 *       400:
 *         description: 
 */

/**
 * @swagger
 * /categories/with-question-count:
 *   get:
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: 
 *       400:
 *         description: 
 */
router.post("/create", auth, categoryController.create);
router.get("/all", categoryController.getcategory);
router.get("/with-question-count", categoryController.list);

module.exports = router;
