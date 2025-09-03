import axios from "axios";
// import { store } from "@/store/store";
// import dotenv from "dotenv";
// dotenv.config();


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const state = store.getState();
//     const token = state.auth.token;
//     console.log("Token from Redux Store:", token);

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );
export default axiosInstance;
