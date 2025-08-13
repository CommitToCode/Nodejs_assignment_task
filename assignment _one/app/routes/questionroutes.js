const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authmiddleware");
const {
  listQuestionsByCategory,
  searchQuestionWithAnswer,
  createQuestion
} = require("../controllers/questionController");
router.post("/questioncreate", auth,createQuestion ); 


router.get("/category/:id", auth, listQuestionsByCategory);


router.get("/search", auth, searchQuestionWithAnswer);

module.exports = router;
