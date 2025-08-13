const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, },
  password: String,
  profilePic: String,
  verified: { type: Boolean, default: false },
  submittedAnswers: [{
          question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },

    answer: [String],
    submittedAt: Date
  }]
}, { timestamps: true });
module.exports = mongoose.model('Userquiz', userSchema);
