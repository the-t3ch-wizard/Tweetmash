import { axiosInstance } from "@/lib/api/axiosInstance"
import API_ENDPOINTS from "@/lib/api/endPoints"
import { schedulePostValues } from "@/validations/tweet/schedule-post";

export const initializeTwitterAuthorization = async () => {
  const response = await axiosInstance.post(API_ENDPOINTS.INITIALIZE_TWITTER_AUTHORIZATION)
  
  return response;
}

export const connectTwitter = async (oauth_token: string, oauth_verifier: string) => {
  const response = await axiosInstance.post(API_ENDPOINTS.CONNECT_TWITTER + `?oauth_verifier=${oauth_verifier}&oauth_token=${oauth_token}`)

  return response;
}

export const disconnectTwitter = async () => {
  const response = await axiosInstance.put(API_ENDPOINTS.DISCONNECT_TWITTER)

  return response;
}

export const authorizeTwitter = async (code: string) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTHORIZE_TWITTER, {
    code
  })
  
  return response;
}

export const getTwitterBasicDetails = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.BASIC_TWITTER_DETAILS)
  
  return response;
}

export const postTweet = async (text: string) => {
  const response = await axiosInstance.post(API_ENDPOINTS.TWITTER_TWEET, {
    tweetContent: text
  })

  return response;
}

export const getAllTweets = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_TWEETS)

  return response;
}

export const deleteTweet = async (tweetId: string, id: string) => {
  const response = await axiosInstance.delete(API_ENDPOINTS.TWITTER_TWEET + `?tweetId=${tweetId}&id=${id}`)

  return response;
}

export const postScheduleTweet = async (data: schedulePostValues) => {
  const response = await axiosInstance.post(API_ENDPOINTS.SCHEDULE_TWEET, data)

  return response;
}
