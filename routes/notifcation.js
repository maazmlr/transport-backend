import express from "express";
import {
  createNotificationController,
  getUserNotificationsController,
} from "../controller/notification.js";

const router = express.Router();

router.route("/send").post(createNotificationController);
router.route("/:userId").get(getUserNotificationsController);

export default router;
