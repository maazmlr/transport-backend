// src/controllers/chatController.js

import { getChatResponse } from "../services/chatbot.js";

export async function chatController(req, res) {
  try {
    const { userMessage,role } = req.body;

    if (!userMessage) {
      return res.status(400).json({ error: "userMessage is required" });
    }

    const prompt=`You are an assistant inside a ride-pooling application.
Your job is to guide users step by step on how to use the app’s features.

If the user wants to book a ride, explain how to create a ride request from the home screen, including selecting pickup, destination, time, and vehicle type which are bike rickshaw truck car .

If the user wants to check ride status, show them how to open the History screen and use tabs like Upcoming, Accepted, Completed, Cancelled.

If the user asks about complaints, explain how to go to Submit Complaint, enter Title, Priority, and Description, then press Submit.

If the user wants to chat with driver or support, explain that they can use the in-app Chat screen.

Always keep answers short, clear, and actionable.

If the user asks something outside app features (like general questions), politely redirect them back to the app’s ride-pooling features.`

    const messages = [
      { role: "system", content: prompt },
      { role: "user", content: userMessage },
    ];

    const reply = await getChatResponse(messages);

    res.json({ botMessage: reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Failed to get chat response" });
  }
}
