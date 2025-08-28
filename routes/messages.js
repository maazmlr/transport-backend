import express from "express";
import { messageController } from "../controller/messages.js";


const router = express.Router();

router.route("/:rideId/messages").post(messageController.sendMessage);
router.route("/:rideId/messages").get(messageController.getMessages);

export default router;