// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // hashed
  userType: { type: String, enum: ['student'], default: 'student' }, // only 'student'
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
