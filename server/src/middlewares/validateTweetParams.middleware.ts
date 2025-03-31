import { NextFunction } from "express";
import { errorResponse } from "../lib/utils";
import { Req, Res } from "../types/types";
import { User } from "../models/user.model";
import { GlobalMetrics } from "../models/globalMetrics.model";

// Allowed values for free users
const FREE_TONES = [
  "professional",
  "humorous",
  "inspirational",
  "casual",
  "sarcastic",
  "promotional",
  "educational",
  "provocative",
  "empathetic",
  "urgent",
  "storytelling",
  "controversial",
  "whimsical",
  "analytical",
  "minimalist",
];

const FREE_RECURRENCE = ["none", "daily", "weekly"];

// Allowed values for paid users (pro/enterprise)
const PAID_TONES = [
  ...FREE_TONES,
];

const PAID_RECURRENCE = ["none", "daily", "weekly", "monthly", "yearly"];

export const validateTweetParams = async (req: Req, res: Res, next: NextFunction) => {
  try {
    const { tone, recurrence, scheduledTime } = req.body;
    const userId = req.user?.userId;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(errorResponse(404, "User not found"));
    }

    // Validate tone based on plan type
    if (user.planType === "free") {
      if (tone && !FREE_TONES.includes(tone)) {
        return res.status(400).json(errorResponse(400, 
          `Free users can only use these tones: ${FREE_TONES.join(", ")}`
        ));
      }
      
      if (recurrence && !FREE_RECURRENCE.includes(recurrence)) {
        return res.status(400).json(errorResponse(400,
          `Free users can only use these recurrence options: ${FREE_RECURRENCE.join(", ")}`
        ));
      }
    } else {
      // Paid user validations
      // if (tone && !PAID_TONES.includes(tone)) {
      //   return res.status(400).json(errorResponse(400,
      //     `Invalid tone selected. Allowed tones: ${PAID_TONES.join(", ")}`
      //   ));
      // }
      
      // if (recurrence && !PAID_RECURRENCE.includes(recurrence)) {
      //   return res.status(400).json(errorResponse(400,
      //     `Invalid recurrence option. Allowed options: ${PAID_RECURRENCE.join(", ")}`
      //   ));
      // }
    }

    // For free users, check daily limits if scheduling for today
    if (user.planType === "free") {
      const scheduledDate = new Date(scheduledTime);
      const today = new Date();
      
      if (scheduledDate.getDate() === today.getDate() && 
          scheduledDate.getMonth() === today.getMonth() && 
          scheduledDate.getFullYear() === today.getFullYear()) {
        
        // Reset counter if it's a new day
        if (!user.lastTweetDate || 
            user.lastTweetDate.getDate() !== today.getDate() || 
            user.lastTweetDate.getMonth() !== today.getMonth() || 
            user.lastTweetDate.getFullYear() !== today.getFullYear()) {
          user.dailyTweetCount = 0;
          user.lastTweetDate = today;
          await user.save();
        }

        if (user.dailyTweetCount >= 3) {
          return res.status(429).json(errorResponse(429, 
            "Free plan limit reached. You can only schedule 3 tweets per day."
          ));
        }
      }

      // Check global free plan limit
      // const metrics = await GlobalMetrics.findOne().select("dailyTweetCount");
      // if (metrics && metrics.dailyTweetCount >= 17) {
      //   return res.status(429).json(errorResponse(429,
      //     "Application's tweet limit has been met for free plans today. Please try again tomorrow or upgrade to a paid plan."
      //   ));
      // }
    }

    if (req.user) {
      req.user.planType = user.planType;
      req.user.dailyTweetCount = user.dailyTweetCount;
    }

    next();
  } catch (error) {
    console.error("Error in validateTweetParams:", error);
    return res.status(500).json(errorResponse(500, "Internal server error"));
  }
};