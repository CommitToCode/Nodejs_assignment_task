const Question = require('../models/question');
const Answer = require('../models/answer');
const mongoose = require('mongoose');




exports.createQuestion = async (req, res) => {
  try {
    const { text, options, correctAnswer, categoryIds } = req.body;

    if (!text || !options || !correctAnswer || !categoryIds || categoryIds.length === 0) {
      return res.status(400).json({ message: "All fields are required including at least one categoryId" });
    }

    const question = new Question({
      text,
      options,
      correctAnswer,
         categories: categoryIds,
    });

    await question.save();
    res.status(201).json({ message: "Question created successfully", question });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listQuestionsByCategory = async (req, res) => {
  const categoryId = req.params.id;

  const questions = await Question.aggregate([
    { $match: { categoryIds: new mongoose.Types.ObjectId(categoryId) } },
    { $project: { text: 1, options: 1 } }
  ]);

  res.json(questions);
};

exports.searchQuestionWithAnswer = async (req, res) => {
  try {
    const search = req.query.question || '';
    console.log("Search Text:", search);

    if (!search.trim()) {
      return res.status(400).json({ message: "Search query cannot be empty" });
    }

    const result = await Answer.aggregate([
      {
        $lookup: {
          from: 'questions',
          localField: 'questionId',
          foreignField: '_id',
          as: 'questionDetails'
        }
      },
      { $unwind: '$questionDetails' },
      {
        $match: {
          'questionDetails.text': {
            $regex: new RegExp(search, 'i') 
          }
        }
      },
      {
        $project: {
          answer: 1,
          submitTime: 1,
          timezone: 1,
          question: '$questionDetails.text'
        }
      },
      { $sort: { submitTime: -1 } }
    ]);
    console.log("Aggregation result:", result);

    if (result.length === 0) {
      return res.status(404).json({ message: "No submitted answers matched your question" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error during search" });
  }
};


exports.listCategoriesWithCount = async (req, res) => {
  try {
    const categoriesWithCount = await Category.aggregate([
      {
        $lookup: {
          from: "questions",
          localField: "_id",
          foreignField: "categories",
          as: "questions",
        },
      },
      {
        $project: {
          name: 1,
          totalQuestions: { $size: "$questions" },
        },
      },
    ]);

    res.status(200).json(categoriesWithCount);
  } catch (error) {
    console.error("Error fetching categories with count:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
