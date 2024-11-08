import express from 'express';
import { addAd , listFood, removeFood} from '../controllers/ad.controller.js';
// import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();


//routes
router.post("/add", addAd);
// router.get("/list", listFood);
// router.post("/remove", removeFood);


export default router;