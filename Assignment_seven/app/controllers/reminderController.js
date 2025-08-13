const asyncHandler = require("express-async-handler");
const Reminder = require("../models/Reminder");


const setReminder = asyncHandler(async (req, res) => {
  const { taskId, reminderDate } = req.body;

  if (!taskId || !reminderDate) {
    res.status(400);
    throw new Error("Task ID and reminder date are required");
  }

  const reminder = await Reminder.create({
    task: taskId,
    reminderDate,
    user: req.user.id,
  });

  res.status(201).json(reminder);
});


const editReminder = asyncHandler(async (req, res) => {
  const reminder = await Reminder.findById(req.params.id);

  if (!reminder) {
    res.status(404);
    throw new Error("Reminder not found");
  }

  if (reminder.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedReminder = await Reminder.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedReminder);
});

// @desc    Delete a reminder
// @route   DELETE /api/reminders/:id
// @access  Private
const deleteReminder = asyncHandler(async (req, res) => {
  const reminder = await Reminder.findById(req.params.id);

  if (!reminder) {
    res.status(404);
    throw new Error("Reminder not found");
  }

  if (reminder.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await reminder.deleteOne();
  res.json({ message: "Reminder deleted" });
});

module.exports = {
  setReminder,
  editReminder,
  deleteReminder,
};
