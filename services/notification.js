import db from "../src/db.js";

export const NotificationService = {
  // Create a new notification
  async createNotification({ title, message, user_id }) {
    try {
      const [notification] = await db("notifications")
        .insert({
          title,
          message,
          user_id,
          created_at: new Date(),
        })
        .returning(["id", "title", "message", "user_id", "created_at"]);

      return notification;
    } catch (error) {
      console.error("Error in NotificationService.createNotification:", error);
      throw error;
    }
  },

  // Get all notifications for a user
  async getNotificationsByUser(user_id) {
    try {
      const notifications = await db("notifications")
        .where({ user_id })
        .orderBy("created_at", "desc");

      return notifications;
    } catch (error) {
      console.error("Error in NotificationService.getNotificationsByUser:", error);
      throw error;
    }
  },

  // Mark a notification as read (optional extension)
}