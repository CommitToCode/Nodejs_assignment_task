const Enrollment = require('../models/enrollment');

exports.enrollStudent = async (req, res) => {
  const { student, course } = req.body;
  try {
    const enrollment = new Enrollment({ student, course });
    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
