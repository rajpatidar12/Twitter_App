import Tweet from "../schema/tweet.js";
import cloudinary from "cloudinary";

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

// Create Tweet Repository
export const createTweet = async ({ body, image }) => {
  try {
    console.log("Saving tweet:", { body, image }); // Log tweet data before save

    // Handle image upload if provided
    let imageUrl = null;
    if (image) {
      console.log("Uploading image to Cloudinary...");
      imageUrl = await uploadImageToCloudinary(image);
      console.log("Image uploaded successfully:", imageUrl);
    }

    // Save tweet to the database with image URL if available
    const tweet = await Tweet.create({ body, image: imageUrl });
    console.log("Tweet created successfully:", tweet);

    // Returning tweet object with image details (if available)
    return {
      body: tweet.body,
      image: tweet.image
        ? {
            url: tweet.image,
            public_id: tweet.image.split("/").pop().split(".")[0], // Extracting the image public_id
          }
        : null,
    };
  } catch (error) {
    console.error("Error saving tweet:", error);
    throw error;
  }
};

// Get All Tweets Repository
export const getTweets = async () => {
  try {
    return await Tweet.find().sort({ createdAt: -1 }); // Sort by latest tweets
  } catch (error) {
    console.error("Error fetching tweets:", error.message);
    throw new Error("Database error: Unable to fetch tweets.");
  }
};

// Get Tweet By ID Repository
export const getTweetById = async (tweetId) => {
  try {
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      throw new Error("Tweet not found.");
    }
    return tweet;
  } catch (error) {
    console.error(`Error fetching tweet with ID ${tweetId}:`, error.message);
    throw new Error("Database error: Unable to fetch tweet by ID.");
  }
};

// Delete Tweet Repository
export const deleteTweet = async (tweetId) => {
  try {
    const tweet = await Tweet.findByIdAndDelete(tweetId);
    if (!tweet) {
      throw new Error("Tweet not found.");
    }
    return tweet;
  } catch (error) {
    console.error(`Error deleting tweet with ID ${tweetId}:`, error.message);
    throw new Error("Database error: Unable to delete tweet.");
  }
};

// Update Tweet Repository
export const updateTweet = async (tweetId, body) => {
  try {
    const tweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { body },
      { new: true, runValidators: true } // Ensures updated document is returned and validators run
    );
    if (!tweet) {
      throw new Error("Tweet not found.");
    }
    return tweet;
  } catch (error) {
    console.error(`Error updating tweet with ID ${tweetId}:`, error.message);
    throw new Error("Database error: Unable to update tweet.");
  }
};
