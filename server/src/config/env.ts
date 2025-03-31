import dotenv from "dotenv"

// FIX: path of env based on mode (development, production) and even can change based on env.local
dotenv.config({ path: '.env.local' });

export const env = {
  PORT: Number(process.env.PORT),
  JWTSECRETKEY: String(process.env.JWTSECRETKEY),
  FRONTEND_URL: String(process.env.FRONTEND_URL),
  NODE_ENV: String(process.env.NODE_ENV),
  CLOUDINARY_CLOUD_NAME: String(process.env.CLOUDINARY_CLOUD_NAME),
  CLOUDINARY_API_KEY: String(process.env.CLOUDINARY_API_KEY),
  CLOUDINARY_API_SECRET: String(process.env.CLOUDINARY_API_SECRET),
  GOOGLE_GENAI_API_KEY: String(process.env.GOOGLE_GENAI_API_KEY),
  MONGODB_CONNECTION_URI: String(process.env.MONGODB_CONNECTION_URI),
  TWITTER_CLIENT_ID: String(process.env.TWITTER_CLIENT_ID),
  TWITTER_CLIENT_SECRET: String(process.env.TWITTER_CLIENT_SECRET),
  TWITTER_OAUTH_CONSUMER_KEY: String(process.env.TWITTER_OAUTH_CONSUMER_KEY),
  TWITTER_OAUTH_CONSUMER_SECRET: String(process.env.TWITTER_OAUTH_CONSUMER_SECRET),
  EMAIL_USER: String(process.env.EMAIL_USER),
  EMAIL_PASS: String(process.env.EMAIL_PASS),
  EMAIL_HOST: String(process.env.EMAIL_HOST),
  EMAIL_PORT: String(process.env.EMAIL_PORT),
}
