"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    {
      id: 1,
      patient: "Alice Johnson",
      date: "2025-09-02",
      time: "10:00 AM",
      status: "Pending",
    },
    {
      id: 2,
      patient: "Bob Smith",
      date: "2025-09-03",
      time: "11:30 AM",
      status: "Completed",
    },
    {
      id: 3,
      patient: "Charlie Lee",
      date: "2025-09-04",
      time: "02:00 PM",
      status: "Pending",
    },
    {
      id: 4,
      patient: "David Kim",
      date: "2025-09-05",
      time: "09:30 AM",
      status: "Cancelled",
    },
  ],
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      state.list = state.list.map((a) => (a.id === id ? { ...a, status } : a));
    },
    setAppointments: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { updateStatus, setAppointments } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
