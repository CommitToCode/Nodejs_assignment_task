const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    type: { type: String, enum: ["once", "daily", "weekly"], required: true },
    time: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reminder", reminderSchema);