import UserModel from "../models/user.model.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from 'cloudinary';

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.fields;
  // console.log(req);

  try {
    //check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    //comapare password to database hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    //generate token
    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    const { password: pass, ...userInfo } = user._doc;

    // console.log(res);

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
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    //password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter strong password" });
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

    //generate token
    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

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

//get current user
export const getMe = async (req, res) => {
  // const userId = req?.user._id;
  const userId = req?.params.id;
  // console.log(req);

  try {
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      res.status(400).json({ message: "User not found" });
    };

    res.status(200).json(user);
  } catch (error) {
    console.log(error, "Error in getMe Controller");
    res
      .status(404)
      .json({ success: false, message: "Something went wrong", error });
  }
};

export const updateMe = async (req, res) => {
  if(req?.fields?.userId !== req.params.id) {
    return res.status(400).json({error: 'You can only update your own account!'});
  };

  const { firstName, lastName, email, phoneNumber, country, state, password, newPassword, userId } = req.fields;
  let { displayImage } = req.fields;

  try {
    let user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    // if ((!newPassword && password) || (!password && newPassword)){
    //   return res.status(400).json({error: "Please provide both current password and new password"});
    // }

    // if (password && newPassword) {
    //   const isMatch = await bcrypt.compare(password, user?.password);
    //   if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });

    //   if (newPassword.length < 6){
    //     return res.status(400).json({ error: "Password must be at least 6 characters long" });
    //   }

    //   const salt = await bcrypt.genSalt(10);
    //   user.password = await bcrypt.hash(newPassword, parseInt(salt));
    // };

    if (displayImage) {
      if (user.displayImage){
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

    console.log(user);

    // password should be null in response
    user.password = null;
    
    return res.status(200).json({user, success: true, message: "Updated Successfully"});
  } catch (error) {
    console.log(error, "Error in updateMe Controller");
    res
      .status(404)
      .json({ success: false, message: "Something went wrong", error });
  }
};
