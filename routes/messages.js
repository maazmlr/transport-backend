import express from "express";
import { messageController } from "../controller/messages.js";
import { chatController } from "../controller/chatbot.js";


const router = express.Router();

router.route("/:rideId/messages").post(messageController.sendMessage);
router.route("/:rideId/messages").get(messageController.getMessages);

router.route("/chatbot").post(chatController);

export default router;