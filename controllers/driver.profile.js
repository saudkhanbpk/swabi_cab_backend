import cloudinary from "../config/cloudinary.config";

const uploadImageToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "driver" },
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
    const {} = req.body;
    let imageUrl = "";

    if (req.file) {
      const imageFileBuffer = req.file.buffer;

      try {
        const imageResult = await uploadImageToCloudinary(imageFileBuffer);
        imageUrl = imageResult.secure_url;
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return res.status(500).json({ msg: "Image upload failed" });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
