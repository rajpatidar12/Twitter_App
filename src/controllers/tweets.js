import { StatusCodes } from "http-status-codes";
import {
  createTweet as createTweetService,
  getTweets as getTweetsService,
  getTweetById as getTweetByIdService,
  deleteTweet as deleteTweetService,
  updateTweet as updateTweetService,
} from "../services/tweetService.js";
import { errorResponse, successResponse } from "../utils/responses.js";
import cloudinary from "cloudinary";

const uploadImageToCloudinary = async (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      image,
      { resource_type: "auto", folder: "tweets" }, // Cloudinary folder for uploaded images
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const createTweet = async (req, res) => {
  try {
    let imageUrl = null;

    // Check if there is an image in the request
    if (req.file) {
      console.log("Received file:", req.file); // Check that file is received
      imageUrl = req.file.path; // Cloudinary URL (make sure it's not null)
      console.log("Image URL:", imageUrl); // Log image URL for debugging
    }

    // Prepare the tweet data
    const tweetData = {
      body: req.body.body, // Tweet text
      image: imageUrl, // Image URL (if any)
    };

    console.log("Tweet data to be saved:", tweetData); // Log the data being sent to the DB

    // Create the tweet
    const response = await createTweetService(tweetData);
    console.log("Tweet created successfully:", response); // Log success

    return successResponse(
      response,
      StatusCodes.CREATED,
      "Tweet created successfully",
      res
    );
  } catch (error) {
    console.error("Error creating tweet:", error); // Log error
    return errorResponse(error, res);
  }
};

export const getTweets = async (req, res) => {
  try {
    const response = await getTweetsService();
    return successResponse(
      response,
      StatusCodes.OK,
      "Tweets fetched successfully",
      res
    );
  } catch (error) {
    return errorResponse(error, res);
  }
};

export const getTweetById = async (req, res) => {
  try {
    const response = await getTweetByIdService(req.params.id);
    return successResponse(
      response,
      StatusCodes.OK,
      "Tweet fetched successfully",
      res
    );
  } catch (error) {
    return errorResponse(error, res);
  }
};

export const deleteTweet = async (req, res) => {
  try {
    const response = await deleteTweetService(req.params.id);
    return successResponse(
      response,
      StatusCodes.OK,
      "Tweet deleted successfully",
      res
    );
  } catch (error) {
    return errorResponse(error, res);
  }
};

export const updateTweet = async (req, res) => {
  try {
    const response = await updateTweetService(req.params.id, req.body.body);
    return successResponse(
      response,
      StatusCodes.OK,
      "Tweet updated successfully",
      res
    );
  } catch (error) {
    return errorResponse(error, res);
  }
};

export const sum = (a, b) => {
  return a + b;
};
