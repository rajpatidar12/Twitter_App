import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "./cloudinaryConfig.js"; // Import Cloudinary configuration

// Configure Multer with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tweets", // Cloudinary folder for uploaded files
    allowed_formats: ["jpg", "png", "gif", "mp4"], // Allowed formats
  },
});

const upload = multer({ storage });

export default upload;
