import cloudinary from "../config/cloudinary.config.js";
import DriverProfile from "../models/driver.profile.model.js";

const uploadImageToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    stream.end(fileBuffer);
  });
};

export const driverProfile = async (req, res) => {
  try {
    const { name, email, phoneNumber, carCategory, carModel, carNumber } = req.body;

    if (!name || !email || !phoneNumber || !carCategory || !carModel || !carNumber) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const uploadedImages = {};
    const requiredFields = ["cnicFront", "cnicBack", "carDocument", "licenceFront", "licenceBack"];

    for (const field of requiredFields) {
      if (req.files[field]) {
        try {
          const imageResult = await uploadImageToCloudinary(
            req.files[field][0].buffer,
            "driver"
          );
          uploadedImages[field] = imageResult.secure_url;
        } catch (error) {
          console.error(`Error uploading ${field} to Cloudinary:`, error);
          return res.status(500).json({ message: `${field} upload failed`, success: false });
        }
      } else {
        return res.status(400).json({ message: `${field} is required`, success: false });
      }
    }

    const driverProfile = new DriverProfile({
      name,
      email,
      phoneNumber,
      cnicFront: uploadedImages.cnicFront,
      cnicBack: uploadedImages.cnicBack,
      carCategory,
      carModel,
      carNumber,
      carDocument: uploadedImages.carDocument,
      licenceFront: uploadedImages.licenceFront,
      licenceBack: uploadedImages.licenceBack,
    });

    await driverProfile.save();

    return res.status(201).json({ message: "Driver profile created", success: true });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
