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
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;