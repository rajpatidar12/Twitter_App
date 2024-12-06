import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "./cloudinaryConfig.js"; // Import your centralized Cloudinary configuration

// Set up the Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary, // Using the imported cloudinary instance from your config
  params: async (req, file) => {
    const fileName = `${Date.now()}-${file.originalname}`.replace(/\s/g, "_"); // Sanitize file name
    return {
      folder: "tweets", // Folder name in Cloudinary
      allowed_formats: ["jpg", "png", "gif", "mp4"], // Allowed file formats
      public_id: fileName, // Set file name
    };
  },
});

// Create a Multer instance with Cloudinary storage
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit files to 5 MB
});

export default upload; // Export multer instance for use in your routes
