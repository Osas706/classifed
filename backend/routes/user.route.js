import express from 'express';
import { getMe, loginUser, registerUser, updateMe } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getMe);
router.post('/update/:id', updateMe);


export default router;