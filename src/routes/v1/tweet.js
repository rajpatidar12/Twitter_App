import express from "express";
import upload from "../../config/multerConfig.js"; // Import Multer configuration
import { validate } from "../../validators/zodValidator.js";
import { tweetZodSchema } from "../../validators/tweetZodSchema.js";
import { getTweetByIdManualValidator } from "../../validators/tweetManualValidator.js";
import {
  getTweetById,
  getTweets,
  deleteTweet,
  updateTweet,
  createTweet,
} from "../../controllers/tweets.js";
const router = express.Router();

// Define routes
router.get("/getTweet", getTweets);
router.get("/createTweet", createTweet);

router.get("/:id", getTweetByIdManualValidator, getTweetById);

router.post(
  "/",
  upload.single("tweetImage"), // Use the Multer middleware for file uploads
  validate(tweetZodSchema),
  createTweet
);

router.delete("/:id", getTweetByIdManualValidator, deleteTweet);

router.put("/:id", getTweetByIdManualValidator, updateTweet);

export default router; // Export the router
