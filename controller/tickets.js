// controllers/ticketController.js
import * as TicketService from "../services/tickets.js";

export const createTicket = async (req, res) => {
  const { title, description, priority,userId } = req.body;
  const ticket = await TicketService.createTicket(title, description, priority,userId);
  res.json(ticket);
};

export const getTicket = async (req, res) => {
  const { id } = req.params;
  const ticket = await TicketService.getTicketDetails(id);
  res.json(ticket);
};

export const addMessage = async (req, res) => {
  const { ticketId, senderType, message } = req.body;
  const msg = await TicketService.addMessageToTicket(ticketId, senderType, message);
  res.json(msg);
};

// ✅ New controller just for status update
export const updateTicketStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // "open" | "pending" | "closed"

  try {
    const ticket = await TicketService.updateTicketStatus(id, status);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getMessagesForTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await TicketService.getMessagesForTicket(id);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await TicketService.getAllTickets();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};