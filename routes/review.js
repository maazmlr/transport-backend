import express from "express";

import { createReviewController } from "../controller/review.js";

const router = express.Router();

router.route("/").post(createReviewController);

export default router;
