const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true
    });
    console.log(`MongoDB Connected`);
  } catch (err) {
    console.error('Mongo connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
