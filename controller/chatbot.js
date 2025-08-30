// src/controllers/chatController.js

import { getChatResponse } from "../services/chatbot.js";

export async function chatController(req, res) {
  try {
    const { userMessage,role } = req.body;

    if (!userMessage) {
      return res.status(400).json({ error: "userMessage is required" });
    }

    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: userMessage },
    ];

    const reply = await getChatResponse(messages);

    res.json({ botMessage: reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Failed to get chat response" });
  }
}
