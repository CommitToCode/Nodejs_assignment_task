const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },
  date: { type: Date, required: true },
  presentStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  absentStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Attendance', attendanceSchema);
