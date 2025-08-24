const express = require("express");
const {
  addBlog,
  editBlog,
  deletePost,
  listPosts,
} = require("../controllers/blogController");
const { AuthCheck } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management APIs
 */

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Add a new blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My First Blog"
 *               content:
 *                 type: string
 *                 example: "This is the content of the blog post."
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", AuthCheck, addBlog);

/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: Edit an existing blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Blog ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Blog Title"
 *               content:
 *                 type: string
 *                 example: "Updated blog content..."
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Blog not found
 */
router.put("/:id", AuthCheck, editBlog);

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete a blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Blog ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Blog not found
 */
router.delete("/:id", AuthCheck, deletePost);

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get list of blogs
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of blogs
 *       401:
 *         description: Unauthorized
 */
router.get("/", AuthCheck, listPosts);

module.exports = router;
