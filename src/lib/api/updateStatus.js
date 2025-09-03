import axiosInstance from "./axiosInstance";
import { store } from "@/store/store";

const state = store.getState();
const token = state.auth.token;

export const updateAppointmentStatus = async (appointmentId, status) => {
  console.log("Updating appointment:", appointmentId, "to status:", status);
  try {
    const response = await axiosInstance.patch("/appointments/update-status", {
      appointment_id: appointmentId,
      status,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Error updating appointment status:", error);
    throw error;
  }
};