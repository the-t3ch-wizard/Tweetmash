import { model, Schema } from "mongoose";

export const tweetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  tweetId: {
    type: String,
  },
  content: {
    type: String,
  },
  status: { 
    type: String, 
    enum: ["pending", "posted"], 
    default: "pending"
  },

  topic: {
    type: String,
  },
  scheduledTime: {
    type: Date,
  },
  includeHashtags: {
    type: Boolean,
    default: false,
  },
  recurrence: {
    type: String,
    enum: ["none", "daily", "weekly", "monthly"],
    default: "none",
  },
  tone: {
    type: String,
  },
}, {
  timestamps: true,
})

export const Tweet = model("Tweet", tweetSchema)