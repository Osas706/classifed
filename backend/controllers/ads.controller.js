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
  } = req.fields;
  console.log(req.fields);
  

  let adImage = req.files?.adImage?.path;
  let displayImage = req.files?.displayImage?.path;
  // const userId = req.user._id.toString();

  if (adImage || displayImage) {
    const adUploadedResponse = await cloudinary.uploader.upload(adImage)
      .catch((error) => {
        console.log(error);
      });
    const displayUploadedResponse = await cloudinary.uploader.upload(displayImage)
      .catch((error) => {
        console.log(error);
      });
    
    
    adImage = adUploadedResponse?.secure_url;
    displayImage = displayUploadedResponse?.secure_url;
  };

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
    // user: userId,
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
    const ads = await AdModel.find({});
    res.status(201).json({ success: true, data: ads });
  } catch (error) {
    console.log(error, "Error in listAds controller");
    res.status(404).json({ success: false, message: "Error", error });
  }
};
