import express from "express";
import AuthRoutes from "./auth.js";
import UserRoutes from "./user.js";
import RidesRoute from "./rides.js";
import NotificationRoutes from "./notifcation.js";
import TicketsRoutes from "./tickets.js";
import ReviewRoutes from "./review.js";
import MessageRoutes from "./messages.js";



const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);
router.use("/rides", RidesRoute);
router.use("/notification", NotificationRoutes);
router.use("/tickets", TicketsRoutes);
router.use("/reviews", ReviewRoutes);
router.use("/messages",MessageRoutes );



export default router;
