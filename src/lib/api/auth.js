import axiosInstance from "./axiosInstance";

export const loginUser = (credentials) =>
  axiosInstance.post("/auth/login", credentials);

export const registerPatient = (data) =>
  axiosInstance.post("/auth/register/patient", data);

const registerDoctor = (data) =>
  axiosInstance.post("/auth/register/doctor", data);
