// controllers/messageController.js
import { messageService } from "../services/messages.js";

export const messageController = {
  async sendMessage(req, res) {
    try {
      const { rideId } = req.params;
      const { senderId, message } = req.body;

      const [newMessage] = await messageService.createMessage({
        rideId,
        senderId,
        message,
      });

      res.status(201).json(newMessage);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getMessages(req, res) {
    try {
      const { rideId } = req.params;
      const messages = await messageService.getMessagesByRide(rideId);
      res.json(messages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
