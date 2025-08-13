const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },
  name: { type: String, required: true },
  date: Date,
  duration: String,
  totalMarks: Number,
  marks: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    marksObtained: Number
  }]
});

module.exports = mongoose.model('Exam', examSchema);
