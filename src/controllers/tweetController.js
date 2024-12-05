import express from "express";
import upload from "../../config/multerConfig.js"; // Corrected path
import {
  getTweets,
  getTweetById,
  deleteTweet,
  updateTweet,
  createTweet,
} from "./tweets.js";

import { validate } from "../../validators/zodValidator.js";
import { tweetZodSchema } from "../../validators/tweetZodSchema.js";
import { getTweetByIdManualValidator } from "../../validators/tweetManualValidator.js";

const router = express.Router();

// Define routes
router.get("/", getTweets);
router.get("/:id", getTweetByIdManualValidator, getTweetById);

router.post(
  "/createTweet",
  upload.single("tweetImage"), // Use the Multer middleware for file uploads
  validate(tweetZodSchema),
  createTweet
);

router.delete("/:id", getTweetByIdManualValidator, deleteTweet);

router.put("/:id", getTweetByIdManualValidator, updateTweet);

export default router; // Export the router
