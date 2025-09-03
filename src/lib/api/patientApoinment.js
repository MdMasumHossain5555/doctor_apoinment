import axiosInstance from "./axiosInstance";
import { store } from "@/store/store";

const state = store.getState();
const token = state.auth.token; 

export const createAppointment = async (data) => {
  try {
    const response = await axiosInstance.post("/appointments", data);
    return response;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

export const getPatinetAppointments = ({status, page}) => {
    return axiosInstance.get("/appointments/patient", {
      params: {
        status: status || undefined,
        page,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
}