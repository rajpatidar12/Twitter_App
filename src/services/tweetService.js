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
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

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
    // Handle image upload to Cloudinary
    let imageUrl = null;
    if (image) {
      const uploadedImage = await uploadImageToCloudinary(image);
      imageUrl = uploadedImage.secure_url; // Get the URL from Cloudinary
    }

    // Call the repository to create the tweet with image URL if available
    const tweet = await createTweetRepository({ body, image: imageUrl });
    return tweet;
  } catch (error) {
    throw {
      message: "Error creating tweet",
      status: 500,
      error: error.message,
    };
  }
};

export const getTweets = async () => {
  try {
    const tweets = await getTweetsRepository();
    return tweets;
  } catch (error) {
    throw {
      message: "Error fetching tweets",
      status: 500,
      error: error.message,
    };
  }
};

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
    throw {
      message: "Error fetching tweet by ID",
      status: 500,
      error: error.message,
    };
  }
};

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
    throw {
      message: "Error deleting tweet",
      status: 500,
      error: error.message,
    };
  }
};

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
    throw {
      message: "Error updating tweet",
      status: 500,
      error: error.message,
    };
  }
};
