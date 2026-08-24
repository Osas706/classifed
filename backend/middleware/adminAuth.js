export const adminAuth = (req, res, next) => {
  const key = req.headers["x-admin-key"];

  if (!process.env.ADMIN_SECRET || key !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  next();
};
