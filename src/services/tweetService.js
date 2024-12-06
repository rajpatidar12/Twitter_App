import { Filter } from "bad-words";
import cloudinary from "cloudinary";
import {
  createTweet as createTweetRepository,
  getTweets as getTweetsRepository,
  getTweetById as getTweetByIdRepository,
  deleteTweet as deleteTweetRepository,
  updateTweet as updateTweetRepository,
} from "../repositories/tweetRepository.js";

// Cloudinary image upload function
const uploadImageToCloudinary = async (image) => {
  try {
    const result = await cloudinary.uploader.upload(image);
    if (!result || !result.secure_url) {
      throw new Error("Failed to upload image to Cloudinary.");
    }
    return result.secure_url;
  } catch (error) {
    throw new Error(`Cloudinary upload error: ${error.message}`);
  }
};

// Create Tweet Service
export const createTweet = async ({ body, image }) => {
  const filter = new Filter();

  // Check for profanity in the tweet body
  if (filter.isProfane(body)) {
    console.log("Original tweet:", body);
    console.log("Cleaned tweet:", filter.clean(body));
    throw {
      message: "Tweet contains blocked words",
      status: 400,
    };
  }

  try {
    // Upload image if provided
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    // Save tweet to repository
    const tweet = await createTweetRepository({ body, image: imageUrl });
    return tweet;
  } catch (error) {
    console.error("Error in createTweet:", error);
    throw {
      message: "Error creating tweet",
      status: 500,
      error: error.message,
    };
  }
};

// Get All Tweets
export const getTweets = async () => {
  try {
    const tweets = await getTweetsRepository();
    return tweets;
  } catch (error) {
    console.error("Error in getTweets:", error);
    throw {
      message: "Error fetching tweets",
      status: 500,
      error: error.message,
    };
  }
};

// Get Tweet By ID
export const getTweetById = async (id) => {
  try {
    const tweet = await getTweetByIdRepository(id);
    if (!tweet) {
      throw {
        message: "Tweet not found",
        status: 404,
      };
    }
    return tweet;
  } catch (error) {
    console.error("Error in getTweetById:", error);
    throw {
      message: "Error fetching tweet by ID",
      status: 500,
      error: error.message,
    };
  }
};

// Delete Tweet
export const deleteTweet = async (id) => {
  try {
    const response = await deleteTweetRepository(id);
    if (!response) {
      throw {
        message: "Tweet not found",
        status: 404,
      };
    }
    return response;
  } catch (error) {
    console.error("Error in deleteTweet:", error);
    throw {
      message: "Error deleting tweet",
      status: 500,
      error: error.message,
    };
  }
};

// Update Tweet
export const updateTweet = async (id, body) => {
  const filter = new Filter();

  // Check for profanity in the tweet body
  if (filter.isProfane(body)) {
    throw {
      message: "Tweet contains blocked words",
      status: 400,
    };
  }

  try {
    const response = await updateTweetRepository(id, body);
    if (!response) {
      throw {
        message: "Tweet not found",
        status: 404,
      };
    }
    return response;
  } catch (error) {
    console.error("Error in updateTweet:", error);
    throw {
      message: "Error updating tweet",
      status: 500,
      error: error.message,
    };
  }
};
