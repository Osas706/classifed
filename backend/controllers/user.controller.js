import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { generateTokenAndSetCookie } from "../middleware/auth.js";

//createToken
const createToken = (id) => {
  return jwt.sign({ id }, "random#secret1", {
    expiresIn: "15d",
  });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

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

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.log(error, "Error in loginUser controller");
    res.status(404).json({ success: false, message: "Error", error });
  }
};

//register user
const registerUser = async (req, res) => {
  const { firstName, lastName, password, email } = req.body;

  try {
    //checking is user already exists
    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" });
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



   generateTokenAndSetCookie(user._id, res);

    const user = await newUser.save();

    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error, "Error in registerUser controller");
    res.status(404).json({ success: false, message: "Error", error });
  }
};

export { loginUser, registerUser };
