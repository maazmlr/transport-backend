// models/ticketModel.js
import db from "../src/db.js";

// Create a ticket and attach user_id
export const createTicket = (ticket) =>
  db("tickets")
    .insert(ticket) // ticket must include user_id
    .returning("*");

// Get a single ticket by ID (with user info if needed)
export const getTicketById = (id) =>
  db("tickets")
    .where({ id })
    .first();

// Get all tickets (optionally with user info)
export const getAllTickets = () =>
  db("tickets").select("*");

// Get all tickets of a specific user
export const getTicketsByUserId = (userId) =>
  db("tickets")
    .where({ user_id: userId })
    .select("*");

// Add a message to a ticket
export const addMessage = (message) =>
  db("ticket_messages")
    .insert(message) // message must include ticket_id
    .returning("*");

// Get all messages for a ticket
export const getMessagesByTicketId = (ticketId) =>
  db("ticket_messages")
    .where({ ticket_id: ticketId })
    .orderBy("created_at", "asc")
    .select("*");

// Update ticket status
export const updateTicketStatus = (id, status) =>
  db("tickets")
    .where({ id })
    .update({ status, updated_at: db.fn.now() })
    .returning("*");



// Get all messages for a ticket
export const getMessagesForTicket = (ticketId) =>
  db("ticket_messages")
    .where({ ticket_id: ticketId })
    .orderBy("created_at", "asc");
    