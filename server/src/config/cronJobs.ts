import cron from "node-cron";
import { logger } from "../lib/logger";
import { Tweet } from "../models/tweet.model";
import { addTweet } from "../lib/api/twitter/twitter";

// Schedule cron job to check and post tweets every minute
cron.schedule("* * * * *", async () => {

  logger.info("Checking for scheduled tweets...");

  const now = new Date();
  const start = new Date(now.setSeconds(0, 0));
  const end = new Date(start);
  end.setMinutes(start.getMinutes() + 1);

  try {
    const pendingTweets = await Tweet.find({
      status: "pending",
      scheduledTime: { $gte: start, $lt: end },
    })
    .populate({
      path: "userId",
      select: "twitterData",
    })
    .select("content userId")
    .lean();

    for (const tweet of pendingTweets) {
      const oauth_token = (tweet.userId as any)?.twitterData?.oauth_token;
      const oauth_token_secret = (tweet.userId as any)?.twitterData?.oauth_token_secret;

      const newTweet = await addTweet(oauth_token, oauth_token_secret, String(tweet.content));
      await Tweet.findByIdAndUpdate(tweet._id, { status: "posted" });

      if (newTweet?.data?.id) logger.info(`Tweet posted successfully as ${newTweet?.data?.id}`);
    }
  } catch (error) {
    logger.error("Error fetching or posting tweets:", error);
  }
});
