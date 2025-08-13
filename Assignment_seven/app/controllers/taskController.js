const Task = require("../models/Task");

// Add a new task
const addTask = async (req, res) => {
  try {
    const {
      userId,
      title,
      description,
      priority,
      dueDate,
      categoryId,
      labels,
    } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Create new task
    const newTask = await Task.create({
      userId,
      title,
      description: description || "",
      priority: priority || "Low",
      dueDate: dueDate || null,
      categoryId: categoryId || null,
      labels: labels || [],
      completed: false,
    });

    return res.status(201).json({
      message: "Task added successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error adding task:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Edit a task
const editTask = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // DB update logic placeholder
  res.json({
    message: `Task ${id} updated successfully`,
    updatedData: { title, description },
  });
};

// Delete a task
const deleteTask = (req, res) => {
  const { id } = req.params;

  // DB delete logic placeholder
  res.json({ message: `Task ${id} deleted successfully` });
};

// Mark task as completed
const markTaskCompleted = (req, res) => {
  const { id } = req.params;

  // DB update logic placeholder
  res.json({ message: `Task ${id} marked as completed` });
};

// List all tasks
const listTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); 
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
};

// Reorder tasks
const reorderTasks = (req, res) => {
  const { order } = req.body; // order is expected as an array of IDs in the new order

  // Reorder logic placeholder
  res.json({ message: "Tasks reordered successfully", newOrder: order });
};

module.exports = {
  addTask,
  editTask,
  deleteTask,
  markTaskCompleted,
  listTasks,
  reorderTasks,
};
