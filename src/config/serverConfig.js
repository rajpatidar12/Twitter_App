import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export const PORT = process.env.PORT || 3000; // Define a PORT variable
export const MONGO_URL = process.env.MONGO_URL;
export const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
export const API_KEY = process.env.API_KEY;
export const CLOUD_NAME = process.env.CLOUD_NAME;
