const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  startTime: { type: Date, required: true },
  availableSeats: { type: Number, required: true },
  price: { type: Number, default: 0 }
}, { _id: true });

const screenSchema = new mongoose.Schema({
  screenNumber: { type: Number, required: true },
  seatCapacity: { type: Number, required: true, default: 100 },
  shows: [showSchema]
}, { _id: true });

const theaterSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true },
  numberOfScreens: { type: Number, required: true },
  screens: [screenSchema]
}, { timestamps: true });

module.exports = mongoose.model('Theater', theaterSchema);
