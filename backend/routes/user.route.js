import express from 'express';
import { getMe, loginUser, registerUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', authMiddleware, getMe);
router.post('/register', registerUser);
router.post('/login', loginUser);


export default router;