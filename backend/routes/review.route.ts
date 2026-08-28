import express from "express";
import { addReview, getReviewsForAd } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/add", addReview);
router.get("/ad/:adId", getReviewsForAd);

export default router;
