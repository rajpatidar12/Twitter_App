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

// Cloudinary image upload function
const uploadImageToCloudinary = async (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

export const createTweet = async (req, res) => {
  try {
    // Handle file upload if provided
    let imageUrl = null;
    if (req.file) {
      const uploadedImage = await uploadImageToCloudinary(req.file.path);
      imageUrl = uploadedImage.secure_url; // Get the URL of the uploaded image
    }

    const response = await createTweetService({
      body: req.body.body,
      image: imageUrl,
    });

    return successResponse(
      response,
      StatusCodes.CREATED,
      "Tweet created successfully",
      res
    );
  } catch (error) {
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
