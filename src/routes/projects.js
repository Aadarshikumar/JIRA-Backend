const express = require('express');
const ProjectPresenter = require('../presenters/ProjectPresenter');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.post('/', async (req, res) => {
  // {
  //   "name": "JIRA",
  //   "description": "Tickets and a tasks management"
  // }
  try {
    const project = await ProjectPresenter.createProject(req.body, req.user.id);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  // {
  //   "name": "JIRA",
  //   "description": "Tickets and a tasks management application"
  // }
  try {
    const project = await ProjectPresenter.updateProject(req.params.id, req.body, req.user.id);
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  // DELETE /projects/1
  try {
    const result = await ProjectPresenter.deleteProject(req.params.id, req.user.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;