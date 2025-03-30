import { Router } from "express";
import { asyncHandler } from "../../lib/utils";
import { twitter } from "../../controllers/twitter/twitter.controller";
import { checkTweetLimit } from "../../middlewares/checkTweetLimit.middleware";

export const twitterRoutes = Router();

twitterRoutes.get("/basic-details", asyncHandler(twitter.getBasicDetails))

twitterRoutes.post("/tweet", asyncHandler(checkTweetLimit), asyncHandler(twitter.postTweet))
twitterRoutes.get("/tweets", asyncHandler(twitter.getAllTweets))
twitterRoutes.delete("/tweet", asyncHandler(twitter.deleteTweetById))
twitterRoutes.post("/schedule-tweet", asyncHandler(checkTweetLimit), asyncHandler(twitter.scheduleTweet))

twitterRoutes.get("/count-tweets", asyncHandler(twitter.getAllTweetsCountByMonth))
twitterRoutes.get("/count-posted-tweets", asyncHandler(twitter.getAllPostedTweetsCountByMonth))
twitterRoutes.get("/count-pending-tweets", asyncHandler(twitter.getAllPendingTweetsCountByMonth))
twitterRoutes.get("/count-tweets-data", asyncHandler(twitter.getAllTweetsDataForChartByMonth))
