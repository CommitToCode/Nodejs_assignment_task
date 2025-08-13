const Exam = require('../models/exam');

exports.createExam = async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.assignMarks = async (req, res) => {
  const { examId, studentMarks } = req.body;

  if (!examId || !Array.isArray(studentMarks)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    studentMarks.forEach(({ student, marksObtained }) => {
      if (!student || marksObtained == null) return; // skip invalid

      const existingEntry = exam.marks.find(
        (entry) => entry.student && entry.student.toString() === student
      );

      if (existingEntry) {
        existingEntry.marksObtained = marksObtained;
      } else {
        exam.marks.push({ student, marksObtained });
      }
    });

    await exam.save();

    res.status(200).json({ message: 'Marks assigned successfully', exam });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.fetchResults = async (req, res) => {
  const { student, batch } = req.query;
  try {
    let filter = {};
    if (batch) filter.batch = batch;
    const exams = await Exam.find(filter);
    const results = exams.map(exam => ({
      name: exam.name,
      marks: exam.marks.find(m => m.student.toString() === student)?.marksObtained || 0,
      totalMarks: exam.totalMarks
    }));
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(exam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
