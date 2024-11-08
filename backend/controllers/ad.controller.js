import { v2 as cloudinary } from "cloudinary";
import AdModel from "../models/ad.model.js";

//add food item
export const addAd = async (req, res) => {
  const { title , description,
    category,
    condition,
    price,
    terms,
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    state,} = req.body;

  let {adImage} = req.body;
  let {displayImage} = req.body;
  // const userId = req.user._id.toString();
  

  // if (!title && !adImage) {
	//   return res.status(400).json({ error: "ad must have title or adImage" });
	// }

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

//list all food
export const listFood = async (req, res) => {
  try {
    const foods = await FoodModel.find({});
    res.status(201).json({ success: true, data: foods });
  } catch (error) {
    console.log(error, "Error in listFood controller");
    res.status(404).json({ success: false, message: "Error", error });
  }
};

//remove food item
export const removeFood = async (req, res) => {
  try {
    const food = await FoodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {}); // to delete the image from folder

    await FoodModel.findByIdAndDelete(req.body.id);

    res.status(201).json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error, "Error in removeFood controller");
    res.status(404).json({ success: false, message: "Error", error });
  }
};

