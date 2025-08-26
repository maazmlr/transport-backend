import express from "express";
import {
  acceptRideController,
  changeRideStatusController,
  createRideController,
  getAllRidesController,
  getAvailableRidesController,
  getRideController,
  getRidesByUserController,
} from "../controller/ride.js";
const router = express.Router();

router.route("/register-ride").post(createRideController);
router.route("/get-rides-driver/:id").get(getAvailableRidesController);
router.route("/acceptRide").post(acceptRideController);
router.route("/get-ride/:userId").get(getRidesByUserController);
router.route("/status/:rideId").put(changeRideStatusController);
router.route("/all-rides").get(getAllRidesController);
router.route("/rideById/:rideId").get(getRideController);
export default router;
