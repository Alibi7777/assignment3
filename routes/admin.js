const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/admin', async (req, res) => {
  if (!req.session.user || !req.session.user.admin) {
    return res.status(403).send('Access denied');
  }

  const users = await User.find();
  res.render('admin', { users });
});

router.post('/admin/add', async (req, res) => {
  const { username, password, admin } = req.body;

  try {
    const newUser = new User({ username, password, admin: admin === 'on' });
    await newUser.save();
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.redirect('/admin');
  }
});

router.post('/admin/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.redirect('/admin');
  }
});

module.exports = router;
