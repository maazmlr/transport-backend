import express from "express";
import AuthRoutes from "./auth.js";
import UserRoutes from "./user.js";
import RidesRoute from "./rides.js";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);
router.use("/rides", RidesRoute);

export default router;
