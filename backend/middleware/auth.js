import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

// export const generateTokenAndSetCookie = (id, res) => {
//   console.log(res);
  
//   const token = jwt.sign({ id }, "random#secret1", {
//     expiresIn: "15d",
//   });

//   res.cookie('token', token, {
//       maxAge: 15 * 24 * 60 * 60 * 1000, //milliseconds
//       httpOnly: true, //prevent XSS attcks , cross-site scripting attacks
//       //sameSite: "strict", // CSRF attcks, cross-site request forgery attack
//       // secure: true,
//   });
// };

export const authMiddleware = async (req, res, next) => {
  // console.log(req);
  
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(400).json({ success: false, message: "Not Authorized, No Token Provided" });
  }

  try {
    const token_decode = jwt.verify(token, "random#secret1");
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
