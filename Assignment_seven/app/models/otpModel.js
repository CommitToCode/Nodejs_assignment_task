const mongoose = require("mongoose");


const otpverifySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "1m" },
});

const otpModel = mongoose.model("otp", otpverifySchema);

module.exports = otpModel;
