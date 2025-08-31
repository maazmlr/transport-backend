// src/controllers/chatController.js

import { getChatResponse } from "../services/chatbot.js";

export async function chatController(req, res) {
  try {
    const { userMessage,role } = req.body;

    if (!userMessage) {
      return res.status(400).json({ error: "userMessage is required" });
    }

   const prompt = `
You are an assistant inside a ride-pooling application. 
Your job is to guide users  and drivers step by step on how to use the app’s features.

📱 Passenger App:
- To book a ride: Home > Create Ride > select pickup, destination, time, vehicle type (bike, rickshaw, truck, car).
- To check ride status: History > tabs (Upcoming, Accepted, Completed, Cancelled).
- To submit complaints: Submit Complaint > enter Title, Priority, Description > Submit.
- To chat with driver/support: use in-app Chat screen.
- If user asks non-app questions, politely redirect to app features.

🖥️ Admin Panel:
- To reply to customer support: go to Support > select user complaint > respond.
- To verify driver information: Drivers > pending requests > review docs > Approve/Reject.
- To assign rides: Rides > pending > match driver > confirm assignment.

Keep answers short, clear, and actionable. and no specail characters and escape sequence character.
If the user role is "driver", focus on driver-related features like ride assignments, document uploads, and earnings tracking.
If the user role is "admin", focus on admin panel features like user management, ride oversight, and reporting.
`;


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
