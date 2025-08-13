const Attendance = require('../models/attendance');

exports.markAttendance = async (req, res) => {
  const { batch, date, presentStudents, absentStudents } = req.body;
  try {
    const attendance = new Attendance({ batch, date, presentStudents, absentStudents });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.viewAttendance = async (req, res) => {
  const { student, batch } = req.query;
  try {
    let filter = {};
    if (student) {
      filter.$or = [
        { presentStudents: student },
        { absentStudents: student },
      ];
    }
    if (batch) filter.batch = batch;
    const records = await Attendance.find(filter);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
