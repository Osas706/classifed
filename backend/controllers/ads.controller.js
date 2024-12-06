import { v2 as cloudinary } from "cloudinary";
import AdModel from "../models/ad.model.js";

//add food item
export const addAd = async (req, res) => {
  const {
    title,
    description,
    category,
    condition,
    price,
    terms,
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    state,
    lat,
    long,
    user
  } = req.fields;
  

  let adImage = req?.files?.adImage?.path;
  let displayImage = req?.files?.displayImage?.path;

  if (adImage || displayImage) {
    const adUploadedResponse = await cloudinary.uploader
      .upload(adImage)
      .catch((error) => {
        console.log(error);
      });
    const displayUploadedResponse = await cloudinary.uploader
      .upload(displayImage)
      .catch((error) => {
        console.log(error);
      });

    adImage = adUploadedResponse?.secure_url;
    displayImage = displayUploadedResponse?.secure_url;
  }

  const ad = new AdModel({
    title,
    description,
    category,
    condition,
    price,
    terms,
    adImage: adImage,
    displayImage: displayImage,
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    state,
    lat,
    long,
    user: user,
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
export const listAds = async (req, res) => {
  try {
    const ads = await AdModel.find({}).sort({ createdAt: -1 }) ;
    res.status(201).json({ success: true, data: ads });
  } catch (error) {
    console.log(error, "Error in listAds controller");
    res.status(404).json({ success: false, message: "Error", error });
  }
};

//get my ads(ads created by d logged in user)
export const getMyAds = async (req, res) => {
  const userId = req.params.id;
  
  try {
    const ads = await AdModel.find({ user: userId }).sort({ createdAt: -1 });
    res.status(201).json({ success: true, data: ads });
  } catch (error) {
    console.log(error, 'Error in getMyAds Controller');
    res.status(404).json({ success: false, message: "Something went wrong", error });
  };
};

//delete my ad
export const deleteAd = async (req, res) => {
  const adId = req?.params?.id

  try {
    const ad = await AdModel.findById(adId);
  
    if (!ad) {
      return res.status(404).json({success: false, message: "Ad not found" });
    }

    // if (ad?.user?.toString() !== req.user._id.toString()) {
    //   return res.status(401).json({ error: "You are not authorized to delete this post" });
    // }

    if (ad?.adImage) {
      const adImageId = ad?.adImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(adImageId);
    }

    if (ad?.displayImage) {
      const adImageId = ad?.displayImage.split("/").pop().split(".")[0];
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
export const searchedAds = async (req, res) => {
  const searchTerm = req.query.searchTerm || '';
  const searchLocation = req.query.searchLocation || '';
  const searchCategory = req.query.searchCategory || '';
  
  try {
    const ads = await AdModel.find({
      title: { $regex: searchTerm, $options: 'i'},
      state : { $regex: searchLocation, $options: 'i'},
      category: { $regex: searchCategory, $options: 'i'}
    });
    res.status(201).json({ success: true, data: ads });
  } catch (error) { 
    console.log(error, "Error in searchedAds controller");
    res.status(404).json({ success: false, message: "Error", error });
  }
};

//get an ad
export const getAd = async (req, res) => {
  try {
    const ad = await AdModel.findById(req.params.id);
    if (!ad) {
      res.status(404).json({ success: false, message: "Ad not found" });
    }

    //fetch ads created by this same user
    const adUserId = ad.user;
    const relatedAds = await AdModel.find({user: adUserId});

    res.status(201).json({ success: true, ad , relatedAds});
  } catch (error) {
    console.log(error, "Error in getAd controller");
    res.status(404).json({ success: false, message: "Error", error });
  }
};
