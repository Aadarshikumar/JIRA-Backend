const express = require('express');
const AuthPresenter = require('../presenters/AuthPresenter');
const router = express.Router();
router.post('/register', async (req, res) => {
  // {
  //   "username": "aadii",
  //   "password": "123456",
  //   "role": "admin"
  // }
  try {
    const result = await AuthPresenter.register(req.body);
    // res.status(201).json(result);
    res.json({ success: true, message: 'User registered successfully', data: result });
  } catch (error) {
    // res.status(400).json({ error: error.message });
    res.status(401).json({ success: false, error: error.message });
  }
});
router.post('/login', async (req, res) => {
  // {
  //   "username": "aadii",
  //   "password": "12345"
  // }
  try {
    const result = await AuthPresenter.login(req.body);
    res.json(result);
    res.json({ success: true, data: result });
  } catch (error) {
    // res.status(401).json({ error: error.message });
    res.status(401).json({ success: false, error: error.message });
  }
});
module.exports = router;