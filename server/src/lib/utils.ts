import axios from "axios";
import { logger } from "./logger";
import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env";
import { Req } from "../types/types";

export const asyncHandler = (fn: any) => async (req: any, res: any, next: any) => {
  try {
    await fn(req, res, next);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(errorResponse(500, error.message || "An error occurred"));
  }
};

export const successResponse = (statusCode: number, message = "Req successful", data: any) => {
  logger.info(`RESPONSE: ${statusCode} ${message}`);
  // logger.success(`RESPONSE: ${statusCode} ${message}`);
  return {
    statusCode,
    success: true,
    message,
    data,
  };
};

export const errorResponse = (statusCode: number, message = "An error occurred", errors = []) => {
  logger.error(`ERROR: ${statusCode} ${message}`);
  return {
    statusCode,
    success: false,
    message,
    errors,
  };
};

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  // Optionally send error to an external monitoring service
  // e.g., logErrorToMonitoringService(err);

  res.status(500).json(errorResponse(500, "Internal Server Error"));
};

export const convertFileUrlToBase64 = async (fileUrl: string) => {
  const response = await axios.get(fileUrl, { responseType: 'arraybuffer' }); // Fetch the file as an array buffer
  const base64 = Buffer.from(response.data).toString('base64'); // Convert to Base64
  return base64;
}

export const encodeBase64 = (clientId: string, clientSecret: string) => {
  const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  return encoded;
};

export const getTwitterAuthorizationCodeFromCookie = (req: Req) => {
  const { twitterToken } = req.cookies;
  const authorization_code = twitterToken.token_type + " " + twitterToken.access_token;
  return authorization_code;
}

export const extractOAuthData = (response: string) => {
  const params = new URLSearchParams(response);
  
  return {
    oauth_token: params.get("oauth_token"),
    oauth_token_secret: params.get("oauth_token_secret"),
    oauth_callback_confirmed: params.get("oauth_callback_confirmed")
  };
}

export const parseOAuthString = (oauthString: string) => {
  return oauthString.split('&').reduce((acc, param) => {
    let [key, value] = param.split('=');
    acc[key] = value;
    return acc;
  }, {} as { [key: string]: string })
}
