import { env } from "@/config/env"
import { axiosInstance } from "@/lib/api/axiosInstance"
import API_ENDPOINTS from "@/lib/api/endPoints"

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
