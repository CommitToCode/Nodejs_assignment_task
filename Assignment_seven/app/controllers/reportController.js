const asyncHandler = require("express-async-handler");
const Task = require("../models/Task");


const dailySummary = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tasks = await Task.find({
    user: req.user.id,
    createdAt: { $gte: today },
  });

  res.json({
    date: today,
    totalTasks: tasks.length,
    completedTasks: tasks.filter((t) => t.status === "completed").length,
    pendingTasks: tasks.filter((t) => t.status !== "completed").length,
    tasks,
  });
});


const weeklySummary = asyncHandler(async (req, res) => {
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  const tasks = await Task.find({
    user: req.user.id,
    createdAt: { $gte: weekAgo, $lte: today },
  });

  res.json({
    startDate: weekAgo,
    endDate: today,
    totalTasks: tasks.length,
    completedTasks: tasks.filter((t) => t.status === "completed").length,
    pendingTasks: tasks.filter((t) => t.status !== "completed").length,
    tasks,
  });
});


const taskStatistics = asyncHandler(async (req, res) => {
  const totalTasks = await Task.countDocuments({ user: req.user.id });
  const completedTasks = await Task.countDocuments({
    user: req.user.id,
    status: "completed",
  });
  const pendingTasks = totalTasks - completedTasks;

  res.json({
    totalTasks,
    completedTasks,
    pendingTasks,
    completionRate:
      totalTasks > 0
        ? ((completedTasks / totalTasks) * 100).toFixed(2) + "%"
        : "0%",
  });
});

module.exports = {
  dailySummary,
  weeklySummary,
  taskStatistics,
};
