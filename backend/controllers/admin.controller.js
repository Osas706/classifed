import UserModel from "../models/user.model.js";
import AdModel from "../models/ad.model.js";
import { v2 as cloudinary } from "cloudinary";

//list all sellers with their ad count
export const listSellers = async (req, res) => {
  try {
    const sellers = await UserModel.find().select("-password").sort({ createdAt: -1 });

    const sellersWithCounts = await Promise.all(
      sellers.map(async (seller) => {
        const adsCount = await AdModel.countDocuments({ user: seller._id });
        return { ...seller._doc, adsCount };
      })
    );

    res.status(200).json({ success: true, sellers: sellersWithCounts });
  } catch (error) {
    console.log(error, "Error in listSellers Controller");
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
};

//get a single seller with their ads
export const getSeller = async (req, res) => {
  const sellerId = req.params.id;

  try {
    const seller = await UserModel.findById(sellerId).select("-password");
    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    const ads = await AdModel.find({ user: sellerId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, seller, ads });
  } catch (error) {
    console.log(error, "Error in getSeller Controller");
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
};

//delete a seller and all of their ads
export const deleteSeller = async (req, res) => {
  const sellerId = req.params.id;

  try {
    const seller = await UserModel.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    const ads = await AdModel.find({ user: sellerId });

    for (const ad of ads) {
      if (ad.adImage) {
        await cloudinary.uploader.destroy(ad.adImage.split("/").pop().split(".")[0]).catch(() => {});
      }
      if (ad.displayImage) {
        await cloudinary.uploader.destroy(ad.displayImage.split("/").pop().split(".")[0]).catch(() => {});
      }
    }

    await AdModel.deleteMany({ user: sellerId });
    await UserModel.findByIdAndDelete(sellerId);

    res.status(200).json({ success: true, message: "Seller and their ads deleted" });
  } catch (error) {
    console.log(error, "Error in deleteSeller Controller");
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
};

//list all ads with seller info
export const listAllAdsForAdmin = async (req, res) => {
  try {
    const ads = await AdModel.find()
      .populate("user", "firstName lastName email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, ads });
  } catch (error) {
    console.log(error, "Error in listAllAdsForAdmin Controller");
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
};

//dashboard stats: totals + last 14 days growth
export const getStats = async (req, res) => {
  try {
    const totalUsers = await UserModel.countDocuments();
    const totalAds = await AdModel.countDocuments();

    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

    const usersByDay = await UserModel.aggregate([
      { $match: { createdAt: { $gte: fourteenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const adsByDay = await AdModel.aggregate([
      { $match: { createdAt: { $gte: fourteenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const adsByCategory = await AdModel.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      success: true,
      totalUsers,
      totalAds,
      usersByDay,
      adsByDay,
      adsByCategory,
    });
  } catch (error) {
    console.log(error, "Error in getStats Controller");
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
};
