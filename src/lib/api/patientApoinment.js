import axiosInstance from "./axiosInstance";
import { store } from "@/store/store";

const state = store.getState();
const token = state.auth.token;

export const createAppointment = async (data) => {
  try {
    const response = await axiosInstance.post("/appointments", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPatinetAppointments = ({ status, page }) => {
  return axiosInstance.get("/appointments/patient", {
    params: {
      status: status || undefined,
      page,
    },
    headers: { Authorization: `Bearer ${token}` },
  });
};
