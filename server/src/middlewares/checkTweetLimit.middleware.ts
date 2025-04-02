import { NextFunction } from "express";
import { errorResponse } from "../lib/utils";
import { Req, Res } from "../types/types";
import { User } from "../models/user.model";

export const checkTweetLimit = async (req: Req, res: Res, next: NextFunction) => {
  const userId = req.user?.userId;
  const user = await User.findById(userId);
  
  if (!user) {
    return res.status(404).json(errorResponse(404, "User not found"));
  }

  // Skip check for paid users
  if (user.planType !== "free") {
    return next();
  }

  const today = new Date();
  const lastTweetDate = user.lastTweetDate;
  
  // Reset counter if it's a new day
  if (!lastTweetDate || lastTweetDate.getDate() !== today.getDate() || 
      lastTweetDate.getMonth() !== today.getMonth() || 
      lastTweetDate.getFullYear() !== today.getFullYear()) {
    user.dailyTweetCount = 0;
    user.lastTweetDate = today;
    await user.save();
  }

  // Check if user has reached the limit
  if (user.dailyTweetCount >= 3) {
    return res.status(429).json(errorResponse(429, "Free plan limit reached. You can only post 3 tweets per day."));
  }

  // Check application-wide free plan limit
  // const metrics = await GlobalMetrics.findOne().select("dailyTweetCount")
  // if (metrics && metrics.dailyTweetCount >= 17) {
  //   return res.status(429).json(errorResponse(429, "Application's tweet limit has been met for free plans today. Please try again tomorrow or upgrade to a paid plan."));
  // }

  next();
};