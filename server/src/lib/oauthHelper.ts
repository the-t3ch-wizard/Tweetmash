import OAuth from "oauth-1.0a";
import crypto from "crypto";
import { env } from "../config/env";

export const getOAuthInstance = () => {
  return new OAuth({
    consumer: {
      key: env.TWITTER_OAUTH_CONSUMER_KEY,
      secret: env.TWITTER_OAUTH_CONSUMER_SECRET,
    },
    signature_method: "HMAC-SHA1",
    hash_function(baseString, key) {
      return crypto.createHmac("sha1", key).update(baseString).digest("base64");
    },
  });
};
