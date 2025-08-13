const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, },
  password: String,
  role: { type: String, enum: ['Student', 'Teacher', 'Admin'], default: 'Student' },
  profilePic: { type: String },
  contactInfo: String,
  emailVerificationToken: String,
emailVerificationExpires: Date,
  isVerified: { type: Boolean, default: false }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
