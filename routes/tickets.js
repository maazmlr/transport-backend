// routes/ticketRoutes.js
import express from "express";
import {
  createTicket,
  getTicket,
  addMessage,
  updateTicketStatus,
  getMessagesForTicket,   
    getAllTickets,   // 👈 add this
// 👈 add this
} from "../controller/tickets.js";

const router = express.Router();

router.post("/", createTicket);
router.get("/", getAllTickets);         // 👈 all tickets

router.get("/:id", getTicket);
router.post("/message", addMessage);

// ✅ new status route
router.patch("/:id/status", updateTicketStatus);
router.get("/:id/messages", getMessagesForTicket);

export default router;
