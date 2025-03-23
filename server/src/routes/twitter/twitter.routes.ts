import { Router } from "express";
import { asyncHandler } from "../../lib/utils";
import { twitter } from "../../controllers/twitter/twitter.controller";

export const twitterRoutes = Router();

twitterRoutes.get("/basic-details", asyncHandler(twitter.getBasicDetails))

twitterRoutes.post("/tweet", asyncHandler(twitter.postTweet))
twitterRoutes.get("/tweets", asyncHandler(twitter.getAllTweets))
twitterRoutes.delete("/tweet", asyncHandler(twitter.deleteTweetById))
twitterRoutes.post("/schedule-tweet", asyncHandler(twitter.scheduleTweet))
