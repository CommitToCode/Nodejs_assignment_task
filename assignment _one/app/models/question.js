const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  correctOption: String,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
});
module.exports = mongoose.model('Question', questionSchema);
