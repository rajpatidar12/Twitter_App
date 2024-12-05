import cloudinary from "cloudinary";
import { API_KEY, CLOUD_NAME, SECRET_ACCESS_KEY } from "./serverConfig.js";
const { v2 } = cloudinary;
// Configure Cloudinary with your credentials
v2.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: SECRET_ACCESS_KEY,
});

export default v2; // Export Cloudinary for use in other files
