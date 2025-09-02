"use client";
import React, { useState } from "react";

export default function AppointmentModal({ doctor, isOpen, onClose }) {
  const [date, setDate] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-xl font-semibold mb-4">
          Book Appointment with {doctor.name}
        </h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border w-full p-2 rounded mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-3 py-1 rounded border">
            Cancel
          </button>
          <button
            onClick={() => {
              alert(`Appointment booked on ${date}`);
              onClose();
            }}
            className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
