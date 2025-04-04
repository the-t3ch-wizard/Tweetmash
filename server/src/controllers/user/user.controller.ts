import jwt from "jsonwebtoken";
import { logger } from "../../lib/logger";
import { errorResponse, successResponse } from "../../lib/utils";
import { env } from "../../config/env";
import { Req, Res } from "../../types/types";
import bcrypt from "bcrypt";
import { User } from "../../models/user.model";

// Auth related controller methods
const signup = async (req: Req, res: Res) => {
  logger.info("Signup user");

  const { name, email, password } = req.body;

  const existingUser = await User.findOne({
    email,
  });
  if (existingUser)
    return res
      .status(409)
      .json(errorResponse(409, "User with same email already exists"));

  const newUser = await User.create({
    name,
    email,
    password,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
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
  // had to set options for token as per mode of server

  return res.status(200).json(
    successResponse(200, "User signed up successfully", {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    })
  );
};

const login = async (req: Req, res: Res) => {
  logger.info("Login user");

  const { email, password } = req.body;

  let userFound = await User.findOne({
    email,
  })
  .select("_id name email password twitterData planType")

  if (!userFound) {
    return res.status(400).json(errorResponse(400, "User not found"));
  }

  const passwordMatched = await bcrypt.compare(password, userFound.password);
  if (!passwordMatched) {
    return res.status(401).json(errorResponse(401, "Wrong password"));
  }

  const token = jwt.sign(
    {
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      twitterUsername: userFound.twitterData?.username,
      twitterConnected: (userFound.twitterData?.username && userFound.twitterData?.oauth_token && userFound.twitterData?.oauth_token_secret) ? true : false,
      planType: userFound.planType
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
  // had to set options for token as per mode of server

  if ((userFound?.twitterData?.username?.length && userFound?.twitterData?.username.length > 0) && (userFound?.twitterData?.oauth_token && userFound?.twitterData?.oauth_token.length > 0) && (userFound?.twitterData?.oauth_token_secret && userFound?.twitterData?.oauth_token_secret.length > 0)){
    res.cookie("twitterToken", userFound?.twitterData, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json(
      successResponse(200, "User logged in successfully", {
        id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        twitterUsername: userFound?.twitterData?.username,
        twitterConnected: true,
      })
    );
  }

  return res.status(200).json(
    successResponse(200, "User logged in successfully", {
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
    })
  );
};

const whoAmI = async (req: Req, res: Res) => {
  logger.info("Who am i");

  const { authToken } = req.cookies;

  if (!authToken) {
    return res.status(401).json(errorResponse(401, "No token provided"));
  }

  const decoded: any = jwt.verify(authToken, env.JWTSECRETKEY);
  
  if (!decoded) {
    return res.status(401).json(errorResponse(401, "Invalid token"));
  }

  const existingUser = await User.findOne({
    _id: decoded?.id,
  });
  if (!existingUser) {
    return res
      .status(401)
      .json(errorResponse(401, "Invalid token: User not found"));
  }

  return res.status(200).json(
    successResponse(200, "User details fetched successfully", {
      _id: decoded?.id,
      name: decoded?.name,
      email: decoded?.email,
      twitterUsername: decoded?.twitterUsername,
      twitterConnected: decoded?.twitterConnected,
      planType: decoded?.planType,
    })
  );
};

const logout = async (req: Req, res: Res) => {
  logger.info("Logout user");

  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("twitterToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  // had to set options for token as per mode of server

  return res
    .status(200)
    .json(successResponse(200, "User logged out successfully", null));
};

// User's data related controller methods
const getRemainingTweets = async (req: Req, res: Res) => {
  const userId = req.user?.userId;
  const user = await User.findById(userId);
  
  if (!user) {
    return res.status(404).json(errorResponse(404, "User not found"));
  }

  const today = new Date();
  const lastTweetDate = user.lastTweetDate;
  
  // Reset counter if it's a new day
  if (!lastTweetDate || lastTweetDate.getDate() !== today.getDate() || 
      lastTweetDate.getMonth() !== today.getMonth() || 
      lastTweetDate.getFullYear() !== today.getFullYear()) {
    return res.status(200).json(successResponse(200, "Remaining tweets fetched", {
      remaining: 3,
      limit: 3,
      plan: "free",
      resetTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0), // Midnight tonight
    }));
  }

  return res.status(200).json(successResponse(200, "Remaining tweets fetched", {
    remaining: 3 - user.dailyTweetCount,
    limit: 3,
    plan: "free",
    resetTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0), // Midnight tonight
  }));
};

export const user = {
  signup,
  login,
  whoAmI,
  logout,

  getRemainingTweets,
};
