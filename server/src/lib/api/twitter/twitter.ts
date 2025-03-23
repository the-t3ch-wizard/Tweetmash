import axios from "axios";
import { getOAuthInstance } from "../../oauthHelper";

export const authenticatedUserLookup = async (authorization_code: string) => {
  
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.twitter.com/2/users/me',
    headers: {
      'Authorization': authorization_code, 
    }
  };

  const response = await axios.request(config);
  
  return response;

}

export const addTweet = async (oauth_token: string, oauth_token_secret: string, tweetContent: string) => {

  try {
    const oauth = getOAuthInstance();
  
    const request_data = {
      url: "https://api.twitter.com/2/tweets",
      method: "POST",
    };
  
    const token = { key: oauth_token, secret: oauth_token_secret };
    const authHeader = oauth.toHeader(oauth.authorize(request_data, token));
  
    const response = await axios.post(request_data.url, {
      text: tweetContent,
    }, {
      headers: {
        Authorization: authHeader["Authorization"],
        "Content-Type": "application/json",
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error adding tweet:", error);
  }

}

export const deleteTweet = async (oauth_token: string, oauth_token_secret: string, tweetId: string) => {

  try {
    const oauth = getOAuthInstance();
  
    const request_data = {
      url: `https://api.twitter.com/2/tweets/${tweetId}`,
      method: "DELETE",
    };
  
    const token = { key: oauth_token, secret: oauth_token_secret };
    const authHeader = oauth.toHeader(oauth.authorize(request_data, token));
  
    const response = await axios.delete(request_data.url, {
      headers: {
        Authorization: authHeader["Authorization"],
        "Content-Type": "application/json",
      },
    });
  
    return response.data;
  } catch (error) {
    console.error("Error deleting tweet:", error);
  }

}
