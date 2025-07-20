import express from "express";
import AuthRoutes from "./auth.js";
import UserRoutes from "./user.js";
import RidesRoute from "./rides.js";
import NotificationRoutes from "./notifcation.js";
const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);
router.use("/rides", RidesRoute);
router.use("/notification", NotificationRoutes);

export default router;
