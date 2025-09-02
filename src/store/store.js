"use client";
import { configureStore } from "@reduxjs/toolkit";
import appointmentsReducer from "../features/appointments/appointmentsSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    auth: authReducer,
  },
});
