import { env } from "../../config/env";
import { errorResponse, extractOAuthData, parseOAuthString, successResponse } from "../../lib/utils";
import { Req, Res } from "../../types/types";
import qs from "qs";
import axios from "axios";
import { authenticatedUserLookup } from "../../lib/api/twitter/twitter";
import { User } from "../../models/user.model";
import { getOAuthInstance } from "../../lib/oauthHelper";

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
  try {

    const { oauth_verifier, oauth_token } = req.query; // Extract from request
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

    return res.status(200).json(successResponse(200, "Accessed token successfully", {
      username: parsedData?.screen_name
    }));
  } catch (error: any) {
    console.log("ERROR",error);
    res.status(500).json({ error: error.response?.data || error.message || "" });
  }
};

const getBasicDetails = async (req: Req, res: Res) => {

  const userId = req.user?.userId;

  const userData = await User.findOne({
    _id: userId,
  }).select("twitterData")

  return res.status(200).json(successResponse(200, "Twitter authorized successfully", {
    name: userData?.twitterData?.name,
    username: userData?.twitterData?.username,
  }));
}

export const twitter = {
  authorize,
  initializeAuthorization,
  getAccessToken,
  getBasicDetails,
};
