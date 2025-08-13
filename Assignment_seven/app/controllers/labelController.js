const asyncHandler = require("express-async-handler");
const Label = require("../models/Label");


const addLabel = asyncHandler(async (req, res) => {
  const { name, color } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Label name is required");
  }

  const label = await Label.create({ name, color, user: req.user.id });
  res.status(201).json(label);
});


const listLabels = asyncHandler(async (req, res) => {
  const labels = await Label.find({ user: req.user.id });
  res.json(labels);
});

module.exports = {
  addLabel,
  listLabels,
};
