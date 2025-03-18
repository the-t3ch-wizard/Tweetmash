import { env } from "../../config/env";
import { encodeBase64, errorResponse, successResponse } from "../../lib/utils";
import { Req, Res } from "../../types/types";
import qs from "qs";
import axios from "axios";

const authorize = async (req: Req, res: Res) => {

  const { code } = req.body;

  let data = qs.stringify({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: env.FRONTEND_URL ,
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

  res.cookie("twitterToken", twitterToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(200).json(successResponse(200, "Twitter authorized successfully", null));
};

export const twitter = {
  authorize,
};
