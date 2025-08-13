const User = require('../models/user');
const bcrypt = require('bcryptjs');

class ProfileController {
  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id)
        .select("-password")
        .populate({
          path: "submittedAnswers.question",
          select: "text categories",
          populate: {
            path: "categories",
            select: "name",
            model: "Category",
          },
        });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const submittedAnswers = user.submittedAnswers.map((entry) => ({
        question: entry.question?.text || "Question deleted",
        // categories:
        //   Array.isArray(entry.question?.categories) && entry.question.categories.length > 0
        //     ? entry.question.categories.map((cat) => cat.name).join(", ")
        //     : "N/A",
        answer: entry.answer,
        submittedAt: entry.submittedAt,
      }));

      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          verified: user.verified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        submittedAnswers,
      });
    } catch (err) {
      console.error("Get Profile Error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateProfile(req, res) {
    try {
      const { name, phone, email, password } = req.body;
      const image = req.file?.filename;

      const updateFields = {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(email && { email }),
        ...(image && { image }),
      };

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateFields.password = hashedPassword;
      }

      const updatedUser = await User.findByIdAndUpdate(req.user.id, updateFields, {
        new: true,
      }).select("-password");

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new ProfileController();
