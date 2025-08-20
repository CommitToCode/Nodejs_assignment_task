const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  genre: [{ type: String }],
  language: { type: String, default: '' },
  duration: { type: Number, default: 0 }, 
  cast: [{ type: String }],
  director: { type: String, default: '' },
  releaseDate: { type: Date, default: null },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
