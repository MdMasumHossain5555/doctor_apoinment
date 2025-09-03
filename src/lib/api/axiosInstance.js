import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
