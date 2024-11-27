import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
// import { generateTokenAndSetCookie } from "../middleware/auth.js";

const generateTokenAndSetCookie = (id, res) => {
  console.log(res);

  const token = jwt.sign({ id }, "random#secret1", {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //milliseconds
    httpOnly: true, //prevent XSS attcks , cross-site scripting attacks
    // sameSite: "strict", // CSRF attcks, cross-site request forgery attack
    // secure: true,
  });
};

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.fields;
  // console.log(req);

  try {
    //check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User does not exist" });
    }

    //comapare password to database hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    //create token and send response
    generateTokenAndSetCookie(user._id, res);

    const { password: pass, ...userInfo } = user._doc;

    res.status(201).json({ success: true, userInfo });
  } catch (error) {
    console.log(error, "Error in loginUser controller");
    res.status(404).json({ success: false, message: "Error", error });
  }
};

//register user
export const registerUser = async (req, res) => {
  const { firstName, lastName, password, email } = req.fields;

  try {
    //checking is user already exists
    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    //validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    //password
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Please enter strong password" });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, parseInt(salt));

    const newUser = new UserModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    generateTokenAndSetCookie(user._id, res);

    const { password: pass, ...userInfo } = user._doc;

    res.status(201).json({ success: true, userInfo });
  } catch (error) {
    console.log(error, "Error in registerUser controller");
    res.status(404).json({ success: false, message: "Error", error });
  }
};

//get current user
export const getMe = async (req, res) => {
  const userId = req?.user._id;
  console.log(req);

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
