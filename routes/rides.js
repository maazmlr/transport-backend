import express from "express";
import {
  acceptRideController,
  createRideController,
  getAvailableRidesController,
} from "../controller/ride.js";
const router = express.Router();

router.route("/register-ride").post(createRideController);
router.route("/get-rides-driver/:id").get(getAvailableRidesController);
router.route("/acceptRide").post(acceptRideController);

export default router;
