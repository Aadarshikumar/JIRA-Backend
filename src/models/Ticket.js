const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_PATH = path.join(__dirname, '../data/tickets.json');

class Ticket {
  static async initDB() {
    try {
      await fs.access(DB_PATH);
    } catch {
      await fs.writeFile(DB_PATH, JSON.stringify([]));
    }
  }

  static async create(ticketData) {
    const tickets = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
    
    const newTicket = {
      id: uuidv4(),
      title: ticketData.title,
      description: ticketData.description,
      projectId: ticketData.projectId,
      assignee: ticketData.assignee,
      severity: ticketData.severity || 'medium',
      status: ticketData.status || 'open',
      createdAt: new Date().toISOString()
    };

    tickets.push(newTicket);
    await fs.writeFile(DB_PATH, JSON.stringify(tickets, null, 2));
    return newTicket;
  }

  static async findByProjectId(projectId) {
    const tickets = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
    return tickets.filter(ticket => ticket.projectId === projectId);
  }

  static async updateStatus(id, status) {
    const tickets = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
    const index = tickets.findIndex(ticket => ticket.id === id);
    
    if (index === -1) return null;
    
    tickets[index].status = status;
    await fs.writeFile(DB_PATH, JSON.stringify(tickets, null, 2));
    return tickets[index];
  }
}

Ticket.initDB();

module.exports = Ticket;