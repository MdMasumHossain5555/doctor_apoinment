import axiosInstance from "./axiosInstance";
import { store } from "@/store/store";

const state = store.getState();
const token = state.auth.token;

export const getDoctorAppointments = async (data) => {
  try {
    const response = await axiosInstance.get(
      "/appointments/doctor",
      { params: data ,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      
  });
    return response;
  } catch (error) {
    throw error;
  }
};
