import { env } from "@/config/env";
import axios from "axios";

const apiUrl = env.API_URL;

export const axiosInstance = axios.create({
  baseURL: apiUrl || "http://localhost:7000/api/v1/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

