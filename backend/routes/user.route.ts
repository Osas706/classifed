import express from "express";
import {
  removeFromBookmark,
  addToBookmark,
  getBookmarks,
  getMe,
  loginUser,
  registerUser,
  updateMe,
  emptyBookmark,
  forgotPassword,
  resetPassword,
  deleteAccount,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/:id", getMe);
router.post("/update/:id", updateMe);
router.delete("/delete-account/:id", deleteAccount);

router.post("/add-to-bookmark", addToBookmark);
router.post("/remove-from-bookmark", removeFromBookmark);
router.get("/get-bookmarks/:id", getBookmarks);
router.delete("/empty-bookmarks/:id", emptyBookmark);

export default router;
