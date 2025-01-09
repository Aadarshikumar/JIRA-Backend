const Ticket = require('../models/Ticket');

class TicketPresenter {
  static async createTicket(ticketData, userId) {
    try {
      const ticket = await Ticket.create({
        ...ticketData,
        assignee: ticketData.assignee || userId
      });
      return ticket;
    } catch (error) {
      throw error;
    }
  }

  static async getProjectTickets(projectId) {
    try {
      const tickets = await Ticket.findByProjectId(projectId);
      return tickets;
    } catch (error) {
      throw error;
    }
  }

  static async updateTicketStatus(ticketId, status) {
    try {
      const ticket = await Ticket.updateStatus(ticketId, status);
      if (!ticket) {
        throw new Error('Ticket not found');
      }
      return ticket;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TicketPresenter;