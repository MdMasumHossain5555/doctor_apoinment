"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
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
    addAppointment: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { updateStatus, setAppointments, addAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
