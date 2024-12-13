import express from 'express';
import { addAd , deleteAd, getAd, getDiscoverAds, getMyAds, listAds, searchedAds} from '../controllers/ads.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();


//routes
router.post("/add", addAd);
router.get("/list", listAds);
router.get("/search", searchedAds);
router.get("/discover", getDiscoverAds);
router.get("/:id", getAd);
router.get('/my-ads/:id', getMyAds);
router.delete('/delete/:id', deleteAd);



export default router;