import Jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  console.log(req);

  try {
    const token = req?.cookies?.token;
    if (!token) {
      return res.status(400).json({ success: false, message: "Not Authorized, No Token Provided" });
    }

    const token_decode = Jwt.verify(token, process.env.JWT_SECRET);
    if (!token_decode) {
      res.status(401).json({ error: "Unauthorized: Invalid Token" });
    };

    req.body.userId = token_decode.id;

    const user = await UserModel.findById(token_decode.id).select("-password");
    console.log(user);

    if (!user) {
      res.status(404).json({ error: "User not found" });
    };

    req.user = user;
    next();
  } catch (error) {
    console.log(error, "Error in authMiddleware ");
    res.status(404).json({ success: false, message: "Error", error });
  }
};
