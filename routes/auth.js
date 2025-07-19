import express from "express";
import {
  loginController,
  registerController,
  updatePasswordController,
} from "../controller/auth.js";
const router = express.Router();

router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/update-password").post(updatePasswordController);
export default router;
