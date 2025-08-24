const express = require("express");
const {
  addCategory,
  editCategory,
  deleteCategory,
  listCategories,
} = require("../controllers/categoryController");
const { AuthCheck } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management routes
 */

/**
 * @swagger
 * /:
 *   post:
 *     tags: [Categories]
 *     summary: Add a new category
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
 *         description: Category added successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", AuthCheck, addCategory);

/**
 * @swagger
 * /{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Edit an existing category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", AuthCheck, editCategory);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Delete a category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", AuthCheck, deleteCategory);

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Categories]
 *     summary: List all categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *       401:
 *         description: Unauthorized
 */
router.get("/", AuthCheck, listCategories);

module.exports = router;
