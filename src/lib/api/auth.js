import axiosInstance from "./axiosInstance";

export const loginUser = (credentials) => {
    return axiosInstance.post("/auth/login", credentials);
}
  

export const registerPatient = (data) => {
    return axiosInstance.post("/auth/register/patient", data);
}
  

export const registerDoctor = (data) =>
  axiosInstance.post("/auth/register/doctor", data);
