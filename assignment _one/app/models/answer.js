const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Userquiz" },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  answer: [String],
  submitTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Answer", answerSchema);
