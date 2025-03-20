import { env } from "../../config/env";
import { encodeBase64, errorResponse, getTwitterAuthorizationCodeFromCookie, successResponse } from "../../lib/utils";
import { Req, Res } from "../../types/types";
import qs from "qs";
import axios from "axios";
import { authenticatedUserLookup } from "../../lib/api/twitter/twitter";
import { User } from "../../models/user.model";

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

const getBasicDetails = async (req: Req, res: Res) => {

  const { twitterToken } = req.cookies;

  const authorization_code = twitterToken.token_type + " " + twitterToken.access_token;

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.twitter.com/2/users/me',
    headers: { 
      'Authorization': authorization_code,
    }
  };

  const {data: response} = await axios.request(config);

  // try {
  //   const {data: response} = await axios.request(config);
  // } catch (error: any) {
    /*
    FIX
    if the access token is expired then generate new token using refresh token

    this is error?.response?.data for providing wrong access token
    {
      title: 'Unsupported Authentication',
      detail: 'Authenticating with OAuth 2.0 Application-Only is forbidden for this endpoint.  Supported authentication types are [OAuth 1.0a User Context, OAuth 2.0 User Context].',
      type: 'https://api.twitter.com/2/problems/unsupported-authentication',
      status: 403
    }
    // if (Number(error?.status) === 403 || Number(error?.response?.data?.status) === 403)
    */
  // }

  return res.status(200).json(successResponse(200, "Twitter authorized successfully", response.data));
}

export const twitter = {
  authorize,
  getBasicDetails,
};
