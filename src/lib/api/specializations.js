import axiosInstance from "./axiosInstance";
export const getAllSpecializations = () => {
    return axiosInstance.get("/specializations");
};