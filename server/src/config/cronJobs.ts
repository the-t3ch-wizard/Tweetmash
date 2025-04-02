import cron from "node-cron";
import { logger } from "../lib/logger";
import { Tweet } from "../models/tweet.model";
import { addTweet } from "../lib/api/twitter/twitter";
import { User } from "../models/user.model";
import { GlobalMetrics, initializeGlobalMetrics } from "../models/globalMetrics.model";

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

      if (!newTweet?.data?.id) logger.error(`Error in posting tweet: ${Number(newTweet?.data?.status)}: ${newTweet?.data?.title}`);
      
      if (newTweet?.data?.id) await Tweet.findByIdAndUpdate(tweet._id, { status: "posted", tweetId: newTweet?.data?.id });

      if (newTweet?.data?.id) logger.info(`Tweet posted successfully as ${newTweet?.data?.id}`);
    }
  } catch (error) {
    logger.error("Error fetching or posting tweets:", error);
  }
}, {
  timezone: 'Asia/Kolkata'
});

// Schedule cron job to reset daily tweet counts at midnight
cron.schedule("0 0 * * *", async () => {
  logger.info("Midnight reset: Starting global and user tweet count resets...");
  
  try {
    // 1. Reset free users' daily counts
    const userResetResult = await User.updateMany(
      { 
        planType: "free",
        $or: [
          { dailyTweetCount: { $gt: 0 } },
          { lastTweetDate: { $exists: true } }
        ]
      },
      { 
        $set: { 
          dailyTweetCount: 0,
          lastTweetDate: new Date() // Set to current midnight time
        } 
      }
    );

    // 2. Reset GlobalMetrics daily counts
    const globalMetrics = await GlobalMetrics.findOne();
    if (globalMetrics) {
      await globalMetrics.resetDailyCounts();
      logger.info("Midnight reset: Global daily metrics reset successfully");
    } else {
      await initializeGlobalMetrics();
      logger.info("Midnight reset: Created new GlobalMetrics document");
    }

    logger.info(`Midnight reset: Reset ${userResetResult.modifiedCount} free users + global metrics`);
  } catch (error) {
    logger.error("Midnight reset: Error in reset process:", error);
  }
}, {
  timezone: 'Asia/Kolkata'
});

// Reset monthly counts at midnight on the 1st of each month
cron.schedule('0 0 1 * *', async () => {
  try {
    const metrics = await GlobalMetrics.findOne();
    if (metrics) {
      await metrics.resetMonthlyCounts();
      console.log('Monthly counts reset successfully');
    }
  } catch (error) {
    console.error('Error resetting monthly counts:', error);
  }
}, {
  timezone: 'Asia/Kolkata'
});