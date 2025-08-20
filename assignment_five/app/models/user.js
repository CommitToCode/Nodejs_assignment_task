const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  email: { type: String, required: true, lowercase: true, trim: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: '' },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String, default: '' },
  verificationExpires: { type: Date, default: null }
}, { timestamps: true });

userSchema.pre('save', async function(next){
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function(pwd){
  return bcrypt.compare(pwd, this.password);
};

module.exports = mongoose.model('User', userSchema);
