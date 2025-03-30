import { axiosInstance } from "@/lib/api/axiosInstance"
import API_ENDPOINTS from "@/lib/api/endPoints"
import { responseType } from "@/types/api";

export const signup = async (payload: any) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.SIGNUP, payload, {
    withCredentials: true,
  })
  return response.data;
}

export const login = async (payload: any) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, payload, {
    withCredentials: true,
  })
  return response.data;
}

export const whoAmiI = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.AUTH.WHO_AM_I, {
    withCredentials: true,
  })
  return response.data;
}

export const logout = async () => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT, {}, {
    withCredentials: true,
  })
  return response.data;
}

export const getRemainingTweets = async () : Promise<responseType> => {
  const response = await axiosInstance.get(API_ENDPOINTS.USER.REMAINING_TWEETS())
  return response.data;
}
