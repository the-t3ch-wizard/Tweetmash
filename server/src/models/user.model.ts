import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const twitterDataSchema = new Schema({
  username: {
    type: String,
  },
  oauth_token: {
    type: String,
  },
  oauth_token_secret: {
    type: String,
  },
})

export const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  imageUrl: {
    type: String,
  },
  bio: {
    type: String,
    maxlength: 1000,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  birthDate: {
    type: Date,
  },
  country: {
    type: String,
  },
  twitterData: twitterDataSchema,
  planType: {
    type: String,
    enum: ["free", "pro", "enterprise"],
    default: "free",
  },
  lastTweetDate: {
    type: Date,
  },
  dailyTweetCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
})

userSchema.pre("save", async function (next) {
  let user = this;
  
  // Only hash the password if it has been modified
  if (!user.isModified("password")) {
    return next();
  }

  try {
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (error: any) {
    return next(error);
  }
})

export const User = model("User", userSchema)