const express = require('express');
const TicketPresenter = require('../presenters/TicketPresenter');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

// Create a new ticket
router.post('/', async (req, res) => {
  //   {
  //     "title": "Register Error",
  //     "description": "Users can't able to register on website",
  //     "projectId": "1",
  //     "severity": "medium",
  //     "status": "open"
  // }

  try {
    const ticket = await TicketPresenter.createTicket(req.body, req.user.id);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get tickets for a project
router.get('/project/:projectId', async (req, res) => {

  try {
    const tickets = await TicketPresenter.getProjectTickets(req.params.projectId);
    res.json(tickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update ticket status
router.patch('/:id/status', async (req, res) => {
  //   {
  //     "status": "open"
  //   }
  try {
    const ticket = await TicketPresenter.updateTicketStatus(req.params.id, req.body.status);
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;