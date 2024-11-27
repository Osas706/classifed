import express from 'express';
import { addAd , getAd, listAds, searchedAds} from '../controllers/ads.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();


//routes
router.post("/add", authMiddleware, addAd);
router.get("/list", listAds);
router.get("/search", searchedAds);
router.get("/:id", getAd);



export default router;