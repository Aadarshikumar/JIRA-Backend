const express = require('express');
const TaskPresenter = require('../presenters/TaskPresenter');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

// Create a new task
router.post('/', async (req, res) => {
  try {
    const task = await TaskPresenter.createTask(req.body, req.user.id);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get tasks for a project
router.get('/project/:projectId', async (req, res) => {
  try {
    const tasks = await TaskPresenter.getProjectTasks(req.params.projectId);
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update task status
router.patch('/:id/status', async (req, res) => {
  //   {
  //     "status": "done"
  // }
  try {
    const task = await TaskPresenter.updateTaskStatus(req.params.id, req.body.status);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;