import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    trim: true,
    maxlength: 280,
  },
  image: {
    // Add image field to store the URL
    type: String,
    required: false, // Image is optional
  },
});

const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;
