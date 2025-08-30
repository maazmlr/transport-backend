import express from "express";
import { messageController } from "../controller/messages.js";
import { chatController } from "../controller/chatbot.js";


const router = express.Router();

router.route("/chatbot").post(chatController);

router.route("/:rideId").post(messageController.sendMessage);
router.route("/:rideId").get(messageController.getMessages);


export default router;