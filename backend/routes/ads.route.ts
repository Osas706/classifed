import express from "express";
import { addAd, deleteAd, getAd, getAdStats, getDiscoverAds, getMyAds, listAds, searchedAds } from "../controllers/ads.controller.js";

const router = express.Router();

router.post("/add", addAd);
router.get("/list", listAds);
router.get("/search", searchedAds);
router.get("/discover", getDiscoverAds);
router.get("/stats", getAdStats);
router.get("/my-ads/:id", getMyAds);
router.get("/:id", getAd);
router.delete("/delete/:id", deleteAd);

export default router;
