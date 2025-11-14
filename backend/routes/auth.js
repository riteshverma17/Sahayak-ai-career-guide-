// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const BlacklistedToken = require('../models/BlacklistedToken');

// HELPER: basic email validation
const isEmail = (s) => /^\S+@\S+\.\S+$/.test(s);

/**
 * POST /api/auth/signup
 * Body: { name, email, password }
 * Registers user as 'student' by default.
 */
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    if (!isEmail(email)) return res.status(400).json({ message: 'Invalid email' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({ name: name.trim(), email: email.toLowerCase().trim(), password: hash, userType: 'student' });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, userType: user.userType }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Returns token + user on success.
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, userType: user.userType } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/auth/check-email
 * Body: { email }
 * Returns { exists: boolean }
 */
router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Missing email' });
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    return res.json({ exists: !!user });
  } catch (err) {
    console.error('check-email error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/auth/logout
 * Header: Authorization: Bearer <token>
 * Adds token to blacklist so it cannot be used again.
 */
router.post('/logout', async (req, res) => {
  try {
    const authHeader = req.header('Authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : (req.body.token || req.query.token);
    if (!token) return res.status(400).json({ message: 'No token provided' });

    // try to decode token to get expiry
    let expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // default 7d
    try {
      const decoded = jwt.decode(token);
      if (decoded && decoded.exp) expiresAt = new Date(decoded.exp * 1000);
    } catch (e) { /* ignore */ }

    // upsert blacklist entry
    await BlacklistedToken.updateOne({ token }, { token, expiresAt }, { upsert: true });

    return res.json({ message: 'Logged out' });
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
