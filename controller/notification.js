import { NotificationService } from "../services/notification.js";

export const createNotificationController = async (req, res) => {
  try {
    const { title, message, user_id } = req.body;

    if (!title || !message || !user_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const notification = await NotificationService.createNotification({
      title,
      message,
      user_id,
    });

    return res.status(201).json({
      message: "Notification created successfully",
      notification,
    });
  } catch (error) {
    console.error("createNotificationController error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getUserNotificationsController = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const notifications = await NotificationService.getNotificationsByUser(
      userId
    );

    return res.status(200).json({
      message: "Notifications fetched successfully",
      notifications,
    });
  } catch (error) {
    console.error("getUserNotificationsController error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Optional: mark notification as read
