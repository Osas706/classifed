import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import {
  listSellers,
  getSeller,
  deleteSeller,
  listAllAdsForAdmin,
  getStats,
} from "../controllers/admin.controller.js";
import { deleteAd } from "../controllers/ads.controller.js";

const router = express.Router();

router.get("/sellers", adminAuth, listSellers);
router.get("/sellers/:id", adminAuth, getSeller);
router.delete("/sellers/:id", adminAuth, deleteSeller);

router.get("/ads", adminAuth, listAllAdsForAdmin);
router.delete("/ads/:id", adminAuth, deleteAd);

router.get("/stats", adminAuth, getStats);

export default router;
