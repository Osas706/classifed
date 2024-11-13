import express from 'express';
import { addAd , listAds} from '../controllers/ads.controller.js';
// import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();


//routes
router.post("/add", addAd);
router.get("/list", listAds);



export default router;