// src/services/chatService.js
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.TOKEN,
  defaultHeaders: {
    "HTTP-Referer": "https://yourdomain.com", // optional
    "X-Title": "Your App", // optional
  },
});

export async function getChatResponse(messages) {
  const response = await openai.chat.completions.create({
    model: "deepseek/deepseek-chat-v3.1:free", // or another provider’s model
    messages,
  });

  return response.choices[0].message.content;
}
