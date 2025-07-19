import express from "express";
import {
  acceptRideController,
  createRideController,
  getAvailableRidesController,
  getRidesByUserController,
} from "../controller/ride.js";
const router = express.Router();

router.route("/register-ride").post(createRideController);
router.route("/get-rides-driver/:id").get(getAvailableRidesController);
router.route("/acceptRide").post(acceptRideController);
router.route("/get-ride/:userId").get(getRidesByUserController);

export default router;
