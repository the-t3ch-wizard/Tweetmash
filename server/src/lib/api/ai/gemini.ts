import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../../../config/env";

export const generateTweetContent = async (
  topic: string,
  includeHashtags: boolean,
  tweetLength: string,
  tone: string,
) => {
  
  const genAI = new GoogleGenerativeAI(env.GOOGLE_GENAI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    // model: "gemini-1.5-flash-8b",
    // model: "gemini-2.0-flash-lite-preview-02-05",
    // (e.g., professional, humorous, inspirational, casual, sarcastic, promotional, or educational)
    systemInstruction:
      "You are a professional tweet generator designed to create engaging, high-quality tweets based on user-provided inputs such as topics and tone. Your task is to generate tweets that are concise, compelling, and suitable for the intended audience. Follow these guidelines when crafting tweets: Relevance & Topic Alignment: Ensure the tweet is highly relevant to the provided topic. Stay focused and deliver a clear message. Tone Consistency: Adapt the writing style based on the requested tone. Hashtags Usage: If hashtags are allowed then incorporate them naturally within the tweet, suggest relevant trending or niche-specific hashtags (max 3-5) else if hashtags are not allowed then Do not overload the tweet with any hashtag. Tweet Length: If a specific character limit is given, ensure the tweet fits within it (e.g., 270 characters max for Twitter). Tweet's length should be ≤ 100 characters Engagement & Readability: Use simple, impactful language. Avoid unnecessary jargon unless relevant to the audience. Call-to-Action (CTA) [Optional]: If the tweet is promotional or engaging, suggest a call-to-action such as: 'Follow for more!''Drop your thoughts below' 'Retweet if you agree!' 'Click the link to learn more!' Creativity & Trend Awareness: Where applicable, incorporate pop culture references, memes, or trending phrases to make tweets feel fresh, raw, genuine and engaging. Directly give the generated tweet content as response. Strictly provide response in string, and follow these guidelines: 1. Tone & Style - Write naturally using contractions and conversational phrasing. Adapt tone to context (formal for professional, casual for social). Must avoid robotic language. Avoid using unecessary emoji 2. Structure & Flow - Remove AI disclaimers. Use rhetorical questions and storytelling. Include minor grammatical quirks for authenticity. 3. Content Authenticity - Provide specific examples instead of generic statements. Use personal pronouns (I/you/we) when appropriate. 4. Avoid AI Tells - Allow small imperfections like occasional typos in casual contexts. Vary sentence structure. 5. Emotional Resonance - Match the reader's emotional tone. Express mild opinions when safe. Key Principle: Write like a knowledgeable friend - helpful, engaging and slightly imperfect rather than perfectly robotic."
  });
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    // maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const chatSession = model.startChat({
    generationConfig,
  });

  const message = `Generate a tweet about ${topic} ${includeHashtags ? "with hashtags" : "without hashtags"} in ${tone} tone.`;

  const replyFromAi = await chatSession.sendMessage(message);

  return replyFromAi.response.text();
};
