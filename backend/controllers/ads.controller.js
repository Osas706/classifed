import { v2 as cloudinary } from "cloudinary";
import AdModel from "../models/ad.model.js";
import Jimp from 'jimp-watermark';

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
    user,
  } = req.fields;

  let adImage = req?.files?.adImage?.path;
  let displayImage = req?.files?.displayImage?.path;

  // if (adImage) {
  // await Jimp?.read(adImage)
  //     .then(async (image) => {
  //         const watermark = (await Jimp.read('../mark.png'));

  //         image.composite(watermark, 0, 0, {
  //         mode: Jimp.BLEND_SOURCE_OVER,
  //         opacitySource: 0.5,
  //         opacityDest: 1
  //       });
  //       return image;
  //     })
  //     .then((watermarkedImage) => {
  //         // Save the watermarked image
          
  //         return watermarkedImage.write(adImage);
  //     })
  //     .then(() => {
  //         // Upload the watermarked image to Cloudinary
  //         return cloudinary.uploader.upload(adImage);
  //     })
  //     .then((adUploadedResponse) => {
  //         adImage = adUploadedResponse.secure_url;
  //         console.log("Image successfully watermarked and uploaded to Cloudinary");
  //     })
  //     .catch((err) => {
  //         console.error(err);
  //     });
  // }

  if (adImage) {
    const options = {
      ratio: 0.2, // Scale of watermark relative to the image
      opacity: 0.5, // Opacity of the watermark
     // dstPath: "./output-with-watermark.jpg"  Destination path for watermarked image
    };

    Jimp.addWatermark(adImage, "../mark.png", options)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    const adUploadedResponse = await cloudinary.uploader
      .upload(adImage)
      .catch((error) => {
        console.log(error);
      });

    adImage = adUploadedResponse?.secure_url;
  };

  if (displayImage) {
    const displayUploadedResponse = await cloudinary.uploader
      .upload(displayImage)
      .catch((error) => {
        console.log(error);
      });

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
    const ads = await AdModel.find({}).sort({ createdAt: -1 });
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
    console.log(error, "Error in getMyAds Controller");
    res
      .status(404)
      .json({ success: false, message: "Something went wrong", error });
  }
};

//getDiscoverAds
export const getDiscoverAds = async (req, res) => {
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
export const deleteAd = async (req, res) => {
  const adId = req?.params?.id;

  try {
    const ad = await AdModel.findById(adId);

    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found" });
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
export const getAd = async (req, res) => {
  try {
    const ad = await AdModel.findById(req.params.id);
    if (!ad) {
      res.status(404).json({ success: false, message: "Ad not found" });
    }

    //fetch ads created by this same user
    const adUserId = ad.user;
    const relatedAds = await AdModel.find({ user: adUserId });

    res.status(201).json({ success: true, ad, relatedAds });
  } catch (error) {
    console.log(error, "Error in getAd controller");
    res.status(404).json({ success: false, message: "Error", error });
  }
};
