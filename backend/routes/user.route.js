import express from 'express';
import {removeFromBookmark, addToBookmark, getBookmarks, getMe, loginUser, registerUser, updateMe, emptyBookmark } from '../controllers/user.controller.js';
// import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getMe);
router.post('/update/:id', updateMe);

router.post("/add-to-bookmark", addToBookmark);
router.post("/remove-from-bookmark", removeFromBookmark);
router.get("/get-bookmarks/:id", getBookmarks);
router.delete("/empty-bookmarks/:id", emptyBookmark);



export default router;