import express from "express";
import AuthRoutes from "./auth.js";
import UserRoutes from "./user.js";
import RidesRoute from "./rides.js";
import NotificationRoutes from "./notifcation.js";
import TicketsRoutes from "./tickets.js";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);
router.use("/rides", RidesRoute);
router.use("/notification", NotificationRoutes);
router.use("/tickets", TicketsRoutes);


export default router;
