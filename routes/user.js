import express from "express";
import { updateProfileController } from "../controller/user.js";
const router = express.Router();

router.route("/profile").put(updateProfileController);

export default router;
