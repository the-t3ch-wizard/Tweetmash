import { Schema } from "mongoose";

export const tweetSchema = new Schema({
  tweetId: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
})
