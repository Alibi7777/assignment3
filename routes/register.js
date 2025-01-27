const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.render('index', { registerError: 'Passwords do not match', loginError: null });
  }

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('index', { registerError: 'Username already exists', loginError: null });
    }

    // Save the new user
    const newUser = new User({ username, password, admin: username === 'your_admin_name' });
    await newUser.save();

    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.render('index', { registerError: 'Error creating user', loginError: null });
  }
});

module.exports = router;
