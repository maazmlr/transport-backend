// services/ticketService.js
import * as TicketModel from "../models/tickets.js";
import db from "../src/db.js";

export const createTicket = async (title, description, priority = "medium",userId) => {
  const ticketNumber = `T-${Date.now()}`;
  return TicketModel.createTicket({
    title,
    description,
    priority,
    ticket_number: ticketNumber,
    user_id: userId
  });
};

export const getTicketDetails = async (ticketId) => {
  const ticket = await TicketModel.getTicketById(ticketId);
  const messages = await TicketModel.getMessagesByTicketId(ticketId);
  return { ...ticket, messages };
};

export const addMessageToTicket = async (ticketId, senderType, message) => {
  return TicketModel.addMessage({ ticket_id: ticketId, sender_type: senderType, message });
};


export const updateTicketStatus = async (id, status) => {
  const allowedStatuses = ["open", "pending", "closed"];
  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid status");
  }
  return TicketModel.updateTicketStatus(id, status);
};

export const getAllTickets = async () => {
  return await TicketModel.getAllTickets();
};

export const getMessagesForTicket = async (ticketId) => {
  return await TicketModel.getMessagesForTicket(ticketId);
};