const Course = require('../models/course');
const Batch = require('../models/batch');
const Enrollment = require('../models/enrollment');

exports.addCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    const results = await Promise.all(
      courses.map(async (course) => {
        const totalBatches = await Batch.countDocuments({ course: course._id });
        const totalStudents = await Enrollment.countDocuments({ course: course._id });
        return { ...course.toObject(), totalBatches, totalStudents };
      })
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
