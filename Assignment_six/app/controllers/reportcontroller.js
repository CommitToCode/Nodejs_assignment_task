const Course = require('../models/course');
const Enrollment = require('../models/enrollment');
const Attendance = require('../models/attendance');
const Exam = require('../models/exam');
const User = require('../models/user');
const transporter = require('../helper/emailsetup');

exports.courseEnrollments = async (req, res) => {
  const courses = await Course.find();
  const results = await Promise.all(
    courses.map(async course => {
      const total = await Enrollment.countDocuments({ course: course._id });
      return { ...course.toObject(), total };
    })
  );
  res.json(results);
};

exports.batchReport = async (req, res) => {
  const { batchId } = req.params;
  const attendance = await Attendance.find({ batch: batchId });
  const exams = await Exam.find({ batch: batchId });

  const students = await User.find({ role: 'Student' });
  const report = students.map(student => {
    const attendanceRecords = attendance.filter(a =>
      a.presentStudents.includes(student._id) || a.absentStudents.includes(student._id)
    );
    const presentCount = attendanceRecords.filter(a =>
      a.presentStudents.includes(student._id)
    ).length;
    const percentage = attendanceRecords.length
      ? (presentCount / attendanceRecords.length) * 100
      : 0;

    const marks = exams.map(exam =>
      exam.marks.find(m => m.student.toString() === student._id.toString())?.marksObtained || 0
    );
    const average = marks.length ? marks.reduce((a, b) => a + b, 0) / marks.length : 0;

    return { student: student.name, attendance: percentage, averageMarks: average };
  });

  res.json(report);
};

exports.studentReport = async (req, res) => {
  const { studentId } = req.params;
  const attendance = await Attendance.find({
    $or: [
      { presentStudents: studentId },
      { absentStudents: studentId }
    ]
  });

  const total = attendance.length;
  const present = attendance.filter(a => a.presentStudents.includes(studentId)).length;
  const percentage = total ? (present / total) * 100 : 0;

  const exams = await Exam.find();
  const marks = exams.map(e =>
    e.marks.find(m => m.student.toString() === studentId)?.marksObtained || 0
  );
  const average = marks.length ? marks.reduce((a, b) => a + b, 0) / marks.length : 0;

  res.json({ attendance: percentage, averageMarks: average });
};

exports.sendReportEmail = async (req, res) => {
  const { studentId } = req.params;

  try {
    // 1. Get student
    const student = await User.findById(studentId);
    if (!student || !student.email) {
      return res.status(404).json({ error: 'Student not found or no email' });
    }

    // 2. Attendance calculation
    const attendance = await Attendance.find({
      $or: [
        { presentStudents: studentId },
        { absentStudents: studentId }
      ]
    });

    const total = attendance.length;
    const present = attendance.filter(a => a.presentStudents.includes(studentId)).length;
    const percentage = total ? (present / total) * 100 : 0;

    // 3. Exam marks calculation (safe handling)
    const exams = await Exam.find();
    const marks = exams.map(e => {
      if (!e.marks || !Array.isArray(e.marks)) return 0;

      const record = e.marks.find(m => m.student?.toString() === studentId);
      return record ? record.marksObtained : 0;
    });
    const average = marks.length ? marks.reduce((a, b) => a + b, 0) / marks.length : 0;

    // 4. Email HTML content
    const reportHtml = `
      <h3>Hello ${student.name},</h3>
      <p>Here is your performance report:</p>
      <ul>
        <li><strong>Attendance:</strong> ${percentage.toFixed(2)}%</li>
        <li><strong>Average Marks:</strong> ${average.toFixed(2)}</li>
      </ul>
      <p>Keep up the good work!</p>
    `;

    // 5. Send email
    await transporter.sendMail({
      to: student.email,
      from: process.env.EMAIL_USER,
      subject: 'Your Student Performance Report',
      html: reportHtml
    });

    res.json({ message: 'Report email sent successfully' });

  } catch (err) {
    console.error('Error sending report email:', err);
    res.status(500).json({ error: err.message });
  }
};
