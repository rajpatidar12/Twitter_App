import Tweet from "../schema/tweet.js";

// Create Tweet
export const createTweet = async ({ body, image }) => {
  try {
    return await Tweet.create({ body, image });
  } catch (error) {
    console.error("Error creating tweet:", error.message);
    throw new Error("Database error: Unable to create tweet.");
  }
};

// Get All Tweets
export const getTweets = async () => {
  try {
    return await Tweet.find().sort({ createdAt: -1 }); // Sort by latest tweets
  } catch (error) {
    console.error("Error fetching tweets:", error.message);
    throw new Error("Database error: Unable to fetch tweets.");
  }
};

// Get Tweet By ID
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

// Delete Tweet
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

// Update Tweet
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
