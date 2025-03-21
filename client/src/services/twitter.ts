import { env } from "@/config/env"
import { axiosInstance } from "@/lib/api/axiosInstance"
import API_ENDPOINTS from "@/lib/api/endPoints"

export const initializeTwitterAuthorization = async () => {
  const response = await axiosInstance.post(API_ENDPOINTS.INITIALIZE_TWITTER_AUTHORIZATION)
  
  return response;
}

export const connectTwitter = async (oauth_token: string, oauth_verifier: string) => {
  const response = await axiosInstance.post(API_ENDPOINTS.CONNECT_TWITTER + `?oauth_verifier=${oauth_verifier}&oauth_token=${oauth_token}`)

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
