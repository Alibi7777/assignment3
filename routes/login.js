const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.render('index', { loginError: 'Invalid username or password', registerError: null });
    }

    // Store user info in session
    req.session.user = { id: user._id, username: user.username, admin: user.admin };
    res.redirect('/main');
  } catch (err) {
    console.error(err);
    res.render('index', { loginError: 'Error logging in', registerError: null });
  }
});

module.exports = router;
