import express from "express";
import { updateProfileController ,updateDriverVerificationController,getDriversController,getUserByIdController} from "../controller/user.js";
const router = express.Router();

router.route("/profile").put(updateProfileController);
router.route("/drivers").get(getDriversController);
router.route("/user/:id").get(getUserByIdController);
router.route("/driver/verify/:id").put(updateDriverVerificationController);
export default router;
