import { env } from "../../config/env";
import { errorResponse, extractOAuthData, parseOAuthString, successResponse } from "../../lib/utils";
import { Req, Res } from "../../types/types";
import qs from "qs";
import axios from "axios";
import { addTweet, authenticatedUserLookup, deleteTweet } from "../../lib/api/twitter/twitter";
import { User } from "../../models/user.model";
import { getOAuthInstance } from "../../lib/oauthHelper";
import { logger } from "../../lib/logger";
import { Tweet } from "../../models/tweet.model";
import { generateTweetContent } from "../../lib/api/ai/gemini";
import jwt from "jsonwebtoken";

const authorize = async (req: Req, res: Res) => {

  const { code } = req.body;

  let data = qs.stringify({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: env.FRONTEND_URL + "/auth/twitter/callback" ,
    code_verifier: "challenge",
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.twitter.com/2/oauth2/token',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Authorization': 'Basic UTFwS0xUUndRVWd6Ym1Nek56Rk9UVW94Umt3Nk1UcGphUTpIeWdLU1dNaFh0Ny0xNGxvbkRQdS1oYnROUC0xUmp1YjYtTzA1bTFlZ2djWFoxamRkSQ==',
      'Cookie': '__cf_bm=0_BPwE6XnxnxFRYnXX3akzw6GQExUOXAbA4Xx3SZhWw-1742338848-1.0.1.1-Ik2yK0pJeLZl6Q401a8n1irpu0T4UqQxNFxHrQ2QUT2lmVuuqevM1vOqEaHszD41G4upRQV5TP.7M2ZktMcQXPC4bJC5be4_r0KB58Eteug; guest_id=v1%3A174232347687444935; guest_id_ads=v1%3A174232347687444935; guest_id_marketing=v1%3A174232347687444935; personalization_id="v1_xVlIIR0LVcg95qkbM9gadA=="'
    },
    data : data
  };

  const {data : twitterToken} = await axios.request(config);

  if (!twitterToken) return res.status(400).json(errorResponse(400, "Unable to authorize twitter"));

  res.cookie("twitterToken", twitterToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  const authorization_code = twitterToken.token_type + " " + twitterToken.access_token;

  const userTwitterData = await authenticatedUserLookup(authorization_code);

  const userId = req.user?.userId;

  const updatedUserData = await User.findByIdAndUpdate(userId, {
    $set: {
      twitterData: {
        name: userTwitterData?.data?.name,
        username: userTwitterData?.data?.username,
      }
    }
  }).select('_id')

  return res.status(200).json(successResponse(200, "Twitter authorized successfully", {
    name: userTwitterData?.data?.name,
    username: userTwitterData?.data?.username,
  }));
};

const initializeAuthorization = async (req: Req, res: Res) => {
  logger.info("Get twitter request token")

  const oauth = getOAuthInstance();

  const optionsForTwitterRequestToken = {
    url: "https://api.x.com/oauth/request_token",
    method: "POST",
    data: { oauth_callback: "oob" },
  };

  const authHeader = oauth.toHeader(oauth.authorize(optionsForTwitterRequestToken));

  const response = await axios.post(optionsForTwitterRequestToken.url, null, {
    headers: {
      Authorization: authHeader["Authorization"],
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const oauthData = extractOAuthData(response.data);

  if (String(oauthData.oauth_callback_confirmed) === "true"){
    return res.status(200).json(successResponse(200, "Initialize twitter authorization successfully", {
      oauth_token: oauthData.oauth_token
    }));
  }
  
  return res.status(401).json(errorResponse(401, "Unable to initialize twitter authorization"));

}

export const getAccessToken = async (req: Req, res: Res) => {
  logger.info("Get twitter access token")
  try {

    const { oauth_verifier, oauth_token } = req.query;
    if (!oauth_verifier || !oauth_token) {
      return res.status(400).json(errorResponse(400, "Missing OAuth verifier or token"));
    }

    const oauth = getOAuthInstance();

    const request_data = {
      url: "https://api.x.com/oauth/access_token",
      method: "POST",
    };

    const authHeader = oauth.toHeader(oauth.authorize(request_data));

    const response = await axios.post(request_data.url, null, {
      params: { oauth_verifier: String(oauth_verifier), oauth_token: String(oauth_token) },
      headers: {
        Authorization: authHeader["Authorization"],
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const parsedData = parseOAuthString(response.data);

    res.cookie("twitterToken", parsedData, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    const userId = req.user?.userId;

    const updatedUserData = await User.findByIdAndUpdate(userId, {
      $set: {
        twitterData: {
          username: parsedData?.screen_name,
          oauth_token: parsedData?.oauth_token,
          oauth_token_secret: parsedData?.oauth_token_secret,
        }
      }
    }).select('_id')

    const { authToken } = req.cookies;

    const decoded: any = jwt.verify(authToken, env.JWTSECRETKEY);

    const token = jwt.sign(
      {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        twitterUsername: parsedData?.screen_name,
        twitterConnected: (parsedData?.screen_name && parsedData?.oauth_token && parsedData?.oauth_token_secret) ? true : false,
      },
      env.JWTSECRETKEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json(successResponse(200, "Accessed token successfully", {
      username: parsedData?.screen_name
    }));
  } catch (error: any) {
    console.log("ERROR",error);
    res.status(500).json({ error: error.response?.data || error.message || "" });
  }
};

export const invalidateToken = async (req: Req, res: Res) => {
  logger.info("Invalidate access token")
  try {

    const userId = req.user?.userId;

    const updatedUserData = await User.findByIdAndUpdate(userId, {
      $set: {
        twitterData: {}
      }
    }).select('_id twitterData')

    res.clearCookie("twitterToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    const { authToken } = req.cookies;

    const decoded: any = jwt.verify(authToken, env.JWTSECRETKEY);

    const token = jwt.sign(
      {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
      },
      env.JWTSECRETKEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json(successResponse(200, "Accessed token invalidated successfully", null));
  } catch (error: any) {
    console.log("ERROR",error);
    res.status(500).json({ error: error.response?.data || error.message || "Unable to invalidate token" });
  }
};

const getBasicDetails = async (req: Req, res: Res) => {

  const userId = req.user?.userId;

  const userData = await User.findOne({
    _id: userId,
  }).select("twitterData")

  return res.status(200).json(successResponse(200, "Twitter authorized successfully", {
    username: userData?.twitterData?.username,
  }));

}

const postTweet = async (req: Req, res: Res) => { 

  const { twitterToken } = req.cookies;
  const tweetContent = req.body.tweetContent;
  const userId = req.user?.userId;

  // Check if user exists and is free
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json(errorResponse(404, "User not found"));
  }

  if (user.planType === "free" && user.dailyTweetCount >= 3) {
    return res.status(429).json(errorResponse(429, "Free plan limit reached. You can only post 3 tweets per day."));
  }

  const newTweet = await addTweet(twitterToken.oauth_token, twitterToken.oauth_token_secret, tweetContent);

  const newTweetData = await Tweet.create({
    userId: userId,
    tweetId: newTweet?.data?.id,
    content: newTweet?.data?.text,
    scheduledTime: new Date(),
    status: "posted",
  });

  // Update tweet count for free users
  if (user.planType === "free") {
    user.dailyTweetCount += 1;
    user.lastTweetDate = new Date();
    await user.save();
  }

  return res.status(200).json(successResponse(200, "Tweet posted successfully", {
    tweetId: newTweet?.data?.id,
    content: newTweet?.data?.text,
    remainingTweets: user.planType === "free" ? 3 - user.dailyTweetCount : "unlimited",
  }));

}

const getAllTweets = async (req: Req, res: Res) => {

  const userId = req.user?.userId;

  const tweets = await Tweet.find({
    userId: userId,
  })
  .select("tweetId content status scheduledTime createdAt")
  .sort({ scheduledTime: -1 });

  return res.status(200).json(successResponse(200, "All tweets fetched successfully", tweets));

}

const deleteTweetById = async (req: Req, res: Res) => {

  const { twitterToken } = req.cookies;

  const {tweetId, id} = req.query;

  if (tweetId === undefined) {
    return res.status(400).json(errorResponse(400, "Missing tweetId"));
  }
  
  const deletedTweet = await deleteTweet(twitterToken.oauth_token, twitterToken.oauth_token_secret, String(tweetId));

  const userId = req.user?.userId;

  const deletedTweetData = await Tweet.findOneAndDelete({
    _id: id,
    userId: userId,
  });

  return res.status(200).json(successResponse(200, "Tweet deleted successfully", deletedTweetData));

}

const scheduleTweet = async (req: Req, res: Res) => {

  const { topic, scheduledTime, includeHashtags, recurrence, tone } = req.body;
  const userId = req.user?.userId;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json(errorResponse(404, "User not found"));
  }

  // For immediate scheduled tweets (same day), check the limit
  const scheduledDate = new Date(scheduledTime);
  const today = new Date();
  
  if (user.planType === "free" && 
      scheduledDate.getDate() === today.getDate() && 
      scheduledDate.getMonth() === today.getMonth() && 
      scheduledDate.getFullYear() === today.getFullYear()) {
    
    if (user.dailyTweetCount >= 3) {
      return res.status(429).json(errorResponse(429, "Free plan limit reached. You can only schedule 3 tweets per day."));
    }
  }

  const tweetContent = await generateTweetContent(topic, includeHashtags, tone);

  const newScheduledTweetData = await Tweet.create({
    userId,
    content: tweetContent,
    topic,
    scheduledTime,
    includeHashtags,
    recurrence,
    tone,
  });

  // Update count if scheduled for today
  if (user.planType === "free" && 
      scheduledDate.getDate() === today.getDate() && 
      scheduledDate.getMonth() === today.getMonth() && 
      scheduledDate.getFullYear() === today.getFullYear()) {
    user.dailyTweetCount += 1;
    user.lastTweetDate = today;
    await user.save();
  }

  return res.status(200).json(successResponse(200, "Tweet scheduled successfully", {
    ...newScheduledTweetData.toObject(),
    remainingTweets: user.planType === "free" ? 3 - user.dailyTweetCount : "unlimited",
  }));
}

const getAllTweetsCountByMonth = async (req: Req, res: Res) => {

  const userId = req.user?.userId;
  let {month: currentMonth} = req.query;

  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, Number(currentMonth), 1);
  const endDate = new Date(currentYear, Number(currentMonth)+1, 0, 23, 59, 59, 999);

  const tweets = await Tweet.countDocuments({
    userId: userId,
    scheduledTime: {
      $gte: startDate,
      $lte: endDate,
    }
  })

  return res.status(200).json(successResponse(200, "All tweets count fetched successfully", tweets));
}

const getAllPostedTweetsCountByMonth = async (req: Req, res: Res) => {

  const userId = req.user?.userId;
  let {month: currentMonth} = req.query;

  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, Number(currentMonth), 1);
  const endDate = new Date(currentYear, Number(currentMonth)+1, 0, 23, 59, 59, 999);

  const tweets = await Tweet.countDocuments({
    userId: userId,
    status: "posted",
    scheduledTime: {
      $gte: startDate,
      $lte: endDate,
    }
  })

  return res.status(200).json(successResponse(200, "All posted tweets count fetched successfully", tweets));
}

const getAllPendingTweetsCountByMonth = async (req: Req, res: Res) => {

  const userId = req.user?.userId;
  let {month: currentMonth} = req.query;

  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, Number(currentMonth), 1);
  const endDate = new Date(currentYear, Number(currentMonth)+1, 0, 23, 59, 59, 999);

  const tweets = await Tweet.countDocuments({
    userId: userId,
    status: "pending",
    scheduledTime: {
      $gte: startDate,
      $lte: endDate,
    }
  })

  return res.status(200).json(successResponse(200, "All pending tweets count fetched successfully", tweets));
}

const getAllTweetsDataForChartByMonth = async (req: Req, res: Res) => {

  const userId = req.user?.userId;
  let {month: currentMonth} = req.query;

  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, Number(currentMonth), 1); // ✅ First day of the month
  const endDate = new Date(currentYear, Number(currentMonth) + 1, 0, 23, 59, 59, 999); // ✅ Last day of the month
  const totalDays = endDate.getDate(); // ✅ Get exact total days in the month

  // Fetch both posted and scheduled tweets in parallel
  const [postedTweets, scheduledTweets] = await Promise.all([
    Tweet.find({ userId, status: "posted", scheduledTime: { $gte: startDate, $lte: endDate } }).select("scheduledTime"),
    Tweet.find({ userId, status: "pending", scheduledTime: { $gte: startDate, $lte: endDate } }).select("scheduledTime")
  ]);

  // ✅ Initialize object to hold counts for every day in the current month
  const dailyStats: Record<string, { posted: number; scheduled: number }> = {};

  for (let day = 1; day <= totalDays; day++) {
    const dateStr = new Date(currentYear, Number(currentMonth), day).toISOString().split("T")[0]; // Ensure correct YYYY-MM-DD
    dailyStats[dateStr] = { posted: 0, scheduled: 0 };
  }

  // ✅ Populate actual tweet data
  postedTweets.forEach((tweet: any) => {
    const date = tweet.scheduledTime.toISOString().split("T")[0];
    if (dailyStats[date]) dailyStats[date].posted++;
  });

  scheduledTweets.forEach((tweet: any) => {
    const date = tweet.scheduledTime.toISOString().split("T")[0];
    if (dailyStats[date]) dailyStats[date].scheduled++;
  });

  // ✅ Convert object to sorted array
  const combinedData = Object.entries(dailyStats).map(([date, counts]) => ({
    date,
    posted: counts.posted,
    scheduled: counts.scheduled,
    total: counts.posted + counts.scheduled, // ✅ Ensure total is sum of both
  }));
  
  return res.status(200).json(successResponse(200, "All tweets count fetched successfully", combinedData));
}

export const twitter = {
  authorize,
  initializeAuthorization,
  getAccessToken,
  getBasicDetails,
  postTweet,
  getAllTweets,
  deleteTweetById,
  scheduleTweet,
  invalidateToken,
  getAllTweetsCountByMonth,
  getAllPostedTweetsCountByMonth,
  getAllPendingTweetsCountByMonth,
  getAllTweetsDataForChartByMonth,
};
