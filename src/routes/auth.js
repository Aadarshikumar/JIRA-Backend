
const express = require('express');
const AuthPresenter = require('../presenters/AuthPresenter');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const result = await AuthPresenter.register(req.body);
    res.status(201).json({ success: true, message: 'User registered successfully', data: result });
  } catch (error) {
    console.error('Registration Error:', error.message); // Log for debugging
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await AuthPresenter.login(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Login Error:', error.message); // Log for debugging
    res.status(401).json({ success: false, error: error.message });
  }
});

module.exports = router;