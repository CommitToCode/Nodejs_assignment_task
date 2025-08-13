const User = require("../models/user"); 
const Question = require("../models/question");

exports.submitAnswer = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { questionId, answer } = req.body;



    const user = await User.findById(userId);
    const question = await Question.findById(questionId);

    if (!user || !question) {
      return res.status(404).json({ message: "User or Question not found" });
    }

    
    user.submittedAnswers.push({
      question: question._id,
      answer: Array.isArray(answer) ? answer : [answer], 
      submittedAt: new Date(),
    });

    await user.save();

    res.status(200).json({ message: "Answer submitted successfully" });

  } catch (error) {
    console.error("Answer submit error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
