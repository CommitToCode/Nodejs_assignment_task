const Batch = require('../models/batch');
const Enrollment = require('../models/enrollment');
const User = require('../models/user');

exports.addBatch = async (req, res) => {
  try {
    const batch = new Batch(req.body);
    await batch.save();
    res.status(201).json(batch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.assignStudents = async (req, res) => {
  const { batchId, studentIds } = req.body;
  try {
    await Enrollment.updateMany(
      { student: { $in: studentIds }, batch: null },
      { batch: batchId }
    );
    res.json({ message: 'Students assigned to batch' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listBatches = async (req, res) => {
  try {
    const { courseId } = req.query;
    const batches = await Batch.find({ course: courseId }).populate('assignedTeacher');
    const results = await Promise.all(
      batches.map(async (batch) => {
        const totalStudents = await Enrollment.countDocuments({ batch: batch._id });
        return { ...batch.toObject(), totalStudents };
      })
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBatch = async (req, res) => {
  try {
    const batch = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(batch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBatch = async (req, res) => {
  try {
    await Batch.findByIdAndDelete(req.params.id);
    res.json({ message: 'Batch deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
