import UserModel from "../models/user.model.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
import { sendWelcomeEmail, sendPasswordResetEmail } from "../utils/mailer.js";
import type { Request, Response } from "express";

//login user
export const loginUser = async (req: any, res: Response) => {
  const { email, password } = req.fields;

  try {
    const user: any = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "15d" });

    const { password: pass, ...userInfo } = user._doc;

    res
      .status(201)
      .cookie("token", token, { httpOnly: true, maxAge: 15 * 24 * 60 * 60 * 1000 })
      .json({ success: true, userInfo, token });
  } catch (error) {
    console.log(error, "Error in loginUser controller");
    res.status(404).json({ success: false, message: "Error", error });
  }
};

//register user
export const registerUser = async (req: any, res: Response) => {
  const { firstName, lastName, password, email, state, country } = req.fields;

  try {
    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Please enter strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      state,
      country,
      password: hashedPassword,
    });

    const user: any = await newUser.save();

    sendWelcomeEmail({ to: user.email, firstName: user.firstName });

    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "15d" });

    const { password: pass, ...userInfo } = user._doc;

    res
      .status(201)
      .cookie("token", token, { httpOnly: true, maxAge: 15 * 24 * 60 * 60 * 1000 })
      .json({ success: true, userInfo, token });
  } catch (error) {
    console.log(error, "Error in registerUser controller");
    res.status(404).json({ success: false, message: "Error", error });
  }
};

//request a password reset link
export const forgotPassword = async (req: any, res: Response) => {
  const { email } = req.fields;

  try {
    const user: any = await UserModel.findOne({ email });

    if (!user) {
      return res.status(200).json({ success: true, message: "If that email exists, a reset link has been sent" });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${rawToken}`;
    await sendPasswordResetEmail({ to: user.email, firstName: user.firstName, resetUrl });

    res.status(200).json({ success: true, message: "If that email exists, a reset link has been sent" });
  } catch (error) {
    console.log(error, "Error in forgotPassword Controller");
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
};

//reset password using token from email
export const resetPassword = async (req: any, res: Response) => {
  const { token, password } = req.fields;

  try {
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: "Please enter a strong password" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user: any = await UserModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Reset link is invalid or has expired" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successfully, please login" });
  } catch (error) {
    console.log(error, "Error in resetPassword Controller");
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
};

//permanently delete own account
export const deleteAccount = async (req: any, res: Response) => {
  const userId = req.params.id;
  const { password } = req.fields;

  try {
    const user: any = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    await UserModel.findByIdAndDelete(userId);

    res.status(200).clearCookie("token").json({ success: true, message: "Account deleted" });
  } catch (error) {
    console.log(error, "Error in deleteAccount Controller");
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
};

//get current user
export const getMe = async (req: any, res: Response) => {
  const userId = req?.params.id;

  try {
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error, "Error in getMe Controller");
    res.status(404).json({ success: false, message: "Something went wrong", error });
  }
};

//update current user
export const updateMe = async (req: any, res: Response) => {
  if (req?.fields?.userId !== req.params.id) {
    return res.status(400).json({ error: "You can only update your own account!" });
  }

  const { firstName, lastName, email, phoneNumber, country, state, userId } = req.fields;
  let { displayImage } = req.fields;

  try {
    let user: any = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (displayImage) {
      if (user.displayImage) {
        await cloudinary.uploader.destroy(user?.displayImage.split("/").pop().split(".")[0]);
      }

      const uploadedResponse = await cloudinary.uploader.upload(displayImage);
      displayImage = uploadedResponse.secure_url;
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.displayImage = displayImage || user?.displayImage;
    user.phoneNumber = phoneNumber || user?.phoneNumber;
    user.country = country || user?.country;
    user.state = state || user?.state;

    user = await user.save();
    user.password = null;

    return res.status(200).json({ user, success: true, message: "Updated Successfully" });
  } catch (error) {
    console.log(error, "Error in updateMe Controller");
    res.status(404).json({ success: false, message: "Something went wrong", error });
  }
};

//add ad To Bookmark
export const addToBookmark = async (req: any, res: Response) => {
  const userId = req.fields.userId;
  const bookmarkedAd = req?.fields?.bookmarkedAd;

  const adId = JSON.parse(bookmarkedAd);

  try {
    const user: any = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.bookmarkedAds.includes(adId)) {
      user.bookmarkedAds.push(adId);
      await user.save();
    }

    res.status(201).json({ success: true, message: "Added to Bookmark", bookmarkedAds: user.bookmarkedAds });
  } catch (error) {
    console.log(error, "Error in addToBookmark Controller");
    res.status(404).json({ success: false, message: "Something went wrong", error });
  }
};

//remove ad from Bookmark
export const removeFromBookmark = async (req: any, res: Response) => {
  const userId = req.fields.userId;
  const bookmarkedAd = req?.fields?.bookmarkedAd;

  const adId = JSON.parse(bookmarkedAd);

  try {
    const user: any = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.bookmarkedAds = user.bookmarkedAds.filter((ad: any) => ad?._id !== adId._id);
    await user.save();

    res.status(201).json({ success: true, message: "Removed from Bookmark", bookmarkedAds: user.bookmarkedAds });
  } catch (error) {
    console.log(error, "Error in removeFromBookmark Controller");
    res.status(404).json({ success: false, message: "Something went wrong", error });
  }
};

//get my Bookmark ad ids
export const getBookmarks = async (req: any, res: Response) => {
  const userId = req.params.id;

  try {
    let user: any = await UserModel.findById(userId);
    let bookmarkedAds = user.bookmarkedAds;

    res.status(201).json({ success: true, bookmarkedAds });
  } catch (error) {
    console.log(error, "Error in getBookmarks Controller");
    res.status(404).json({ success: false, message: "Something went wrong", error });
  }
};

//empty bookmark
export const emptyBookmark = async (req: any, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await UserModel.updateOne({ _id: userId }, { $set: { bookmarkedAds: [] } });
    res.status(200).json("All bookmarks deleted");
  } catch (error) {
    console.log(error, "Error in emptyBookmark Controller");
    res.status(404).json({ success: false, message: "Something went wrong", error });
  }
};
