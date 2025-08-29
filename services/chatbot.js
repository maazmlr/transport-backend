// src/services/chatService.js
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env.TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4o-mini"; // supported model

// Initialize client once
const client = ModelClient(endpoint, new AzureKeyCredential(token));

export async function getChatResponse(messages) {
  const response = await client.path("/chat/completions").post({
    body: {
      model,
      messages,
    },
  });

  if (isUnexpected(response)) {
    throw new Error(response.body.error.message || "Unexpected error");
  }

  return response.body.choices[0].message.content;
}
