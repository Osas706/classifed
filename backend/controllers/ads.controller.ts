import { v2 as cloudinary } from "cloudinary";
import AdModel from "../models/ad.model.js";
import Jimp from "jimp-watermark";
import type { Response } from "express";

//add ad
export const addAd = async (req: any, res: Response) => {
  const {
    title, description, category, condition, price, terms,
    firstName, lastName, email, phoneNumber, country, state, lat, long, user,
  } = req.fields;

  let adImage = req?.files?.adImage?.path;
  let displayImage = req?.files?.displayImage?.path;

  if (adImage) {
    const options = {
      ratio: 0.45,
      opacity: 0.7,
      dstPath: "./output-with-watermark.jpg",
    };

    Jimp.addWatermark(adImage, "mark.png", options)
      .then(() => {})
      .catch((err: any) => {
        console.log(err);
      });

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(1000);

    const adUploadedResponse: any = await cloudinary.uploader
      .upload("output-with-watermark.jpg")
      .catch((error) => {
        console.log(error);
      });

    adImage = adUploadedResponse?.secure_url;
  }

  if (displayImage) {
    const displayUploadedResponse: any = await cloudinary.uploader
      .upload(displayImage)
      .catch((error) => {
        console.log(error);
      });

    displayImage = displayUploadedResponse?.secure_url;
  }

  const ad = new AdModel({
    title, description, category, condition, price, terms,
    adImage, displayImage, firstName, lastName, email, phoneNumber,
    country, state, lat, long, user,
  });

  try {
    await ad.save();
    res.status(201).json({ success: true, message: "Ad Added", ad });
  } catch (error) {
    console.log(error, "Error in addAd controller");
    res.status(404).json({ success: false, message: "Error", error });
  }
};

//list all ads
export const listAds = async (req: any, res: Response) => {
  try {
    const ads = await AdModel.find({}).sort({ createdAt: -1 });
    res.status(201).json({ success: true, data: ads });
  } catch (error) {
    console.log(error, "Error in listAds controller");
    res.status(404).json({ success: false, message: "Error", error });
  }
};

//get my ads
export const getMyAds = async (req: any, res: Response) => {
  const userId = req.params.id;

  try {
    const ads = await AdModel.find({ user: userId }).sort({ createdAt: -1 });
    res.status(201).json({ success: true, data: ads });
  } catch (error) {
    console.log(error, "Error in getMyAds Controller");
    res.status(404).json({ success: false, message: "Something went wrong", error });
  }
};

//getDiscoverAds
export const getDiscoverAds = async (req: any, res: Response) => {
  const state = req.query.searchLocation || "";
  const country = req.query.searchCategory || "";

  try {
    const ads = await AdModel.find({
      state: { $regex: state, $options: "i" },
      country: { $regex: country, $options: "i" },
    }).sort({ createdAt: -1 });

    res.status(201).json({ success: true, data: ads });
  } catch (error) {
    console.log(error, "Error in getDiscoverAds Controller");
    res.status(404).json({ success: false, message: "Something went wrong", error });
  }
};

//delete my ad
export const deleteAd = async (req: any, res: Response) => {
  const adId = req?.params?.id;

  try {
    const ad: any = await AdModel.findById(adId);

    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found" });
    }

    if (ad?.adImage) {
      const adImageId = ad.adImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(adImageId);
    }

    if (ad?.displayImage) {
      const adImageId = ad.displayImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(adImageId);
    }

    await AdModel.findByIdAndDelete(adId);

    res.status(200).json({ success: true, message: "Ad deleted successfully" });
  } catch (error) {
    console.log("error in deleteAd controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// list searchedAds
export const searchedAds = async (req: any, res: Response) => {
  const searchTerm = req.query.searchTerm || "";
  const searchLocation = req.query.searchLocation || "";
  const searchCategory = req.query.searchCategory || "";

  try {
    const ads = await AdModel.find({
      title: { $regex: searchTerm, $options: "i" },
      state: { $regex: searchLocation, $options: "i" },
      category: { $regex: searchCategory, $options: "i" },
    });
    res.status(201).json({ success: true, data: ads });
  } catch (error) {
    console.log(error, "Error in searchedAds controller");
    res.status(404).json({ success: false, message: "Error", error });
  }
};

//get an ad
export const getAd = async (req: any, res: Response) => {
  try {
    const ad: any = await AdModel.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found" });
    }

    const adUserId = ad.user;
    const relatedAds = await AdModel.find({ user: adUserId });

    res.status(201).json({ success: true, ad, relatedAds });
  } catch (error) {
    console.log(error, "Error in getAd controller");
    res.status(404).json({ success: false, message: "Error", error });
  }
};
