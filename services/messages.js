// services/messageService.js

import db from "../src/db.js";

export const messageService = {
  async createMessage({ rideId, senderId, message }) {
    return db("messages")
      .insert({ ride_id: rideId, sender_id: senderId, content:message })
      .returning("*");
  },

  async getMessagesByRide(rideId) {
    return db("messages")
      .where({ ride_id: rideId })
      .orderBy("created_at", "asc");
  }
};
