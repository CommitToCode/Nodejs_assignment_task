const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie:  { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  theater:{ type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
  screenNumber: { type: Number, required: true },
  showId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
  showTime: { type: Date, required: true },
  tickets: { type: Number, required: true, min: 1 },
  status: { 
    type: String, 
    default: 'Booked',
    validate: {
      validator: function(value) {
        return ['Booked', 'Cancelled'].includes(value);
      },
      message: props => `${props.value} is not a valid status`
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
