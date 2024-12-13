

// create sellers
for (let index = 0; index < 10; index++) {
  const element = array[index];
  
  

  // create adds
  for (let index = 0; index < 30; index++) {
    const element = array[index];
    
  }
}

async function addWatermarkAndUpload(imagePath, watermarkPath) {
  try {
    // Load the image and watermark
    const image = await Jimp.read(imagePath);
    const watermarkImage = await Jimp.read(watermarkPath);

    // Apply the watermark
    watermark.embed(image, watermarkImage, {
      gravity: 'SouthEast', // Position of the watermark
      opacity: 0.5, // Opacity of the watermark
      margin: 10 // Margin from the edges
    });

    // Save the watermarked image temporarily
    const tempFilePath = 'temp-watermarked-image.jpg';
    await image.writeAsync(tempFilePath);

    // Upload to Cloudinary
    cloudinary.uploader.upload(tempFilePath, (error, result) => {
      if (error) {
        console.error('Error uploading to Cloudinary:', error);
      } else {
        console.log('Uploaded image URL:', result.secure_url);
      }
    });

  } catch (err) {
    console.error('Error processing image:', err);
  }
}

// Call the function with your image and watermark paths
addWatermarkAndUpload('path/to/your/image.jpg', 'path/to/your/watermark.png');



const Jimp = require('jimp');
const watermark = require('jimp-watermark');

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

  if (adImage) {
    // Load the image with Jimp
    const image = await Jimp.read(adImage);
    
    // Apply watermark
    const watermarkedImage = watermark({
      image: image,
      watermark: 'path/to/your/watermark.png', // Replace with the path to your watermark image
      position: 'center' // You can change this to other positions if needed
    });

    // Get the watermarked image buffer
    const watermarkedBuffer = await watermarkedImage.getBufferAsync(Jimp.MIME_JPEG);

    // Upload the watermarked image to Cloudinary
    const adUploadedResponse = await cloudinary.uploader.upload_stream({
      resource_type: 'image',
      format: 'jpg'
    }, (error, result) => {
      if (error) {
        console.log(error);
      }
      return result;
    }).end(watermarkedBuffer);

    adImage = adUploadedResponse?.secure_url;
  }

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