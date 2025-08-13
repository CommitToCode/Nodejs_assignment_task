const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authmiddleware");
const categoryController = require("../controllers/categoryController");


router.post("/create", auth, categoryController.create);
router.get('/all', categoryController.getcategory);

router.get("/with-question-count", categoryController.list);  

module.exports = router;
