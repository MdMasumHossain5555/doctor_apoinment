"use client";
import React, { useState } from "react";

export default function AppointmentList({ appointments, clicked }) {
  

  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  return (
    <>
      <div className="flex space-x-2 mb-4">
        {["All", "PENDING", "CANCELLED", "COMPLETED"].map((status, clicked) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded ${
              filter === status ? "bg-indigo-600 text-white" : "border"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.length === 0 && (
          <>
            <div className="flex justify-center items-center h-32">
              <p className="text-red-500">No appointments found.</p>
            </div>
          </>
        )}
        {filtered.map((a) => (
          <div
            key={a.id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{a.doctor.name}</p>
              <p className="text-gray-500">{a.date}</p>
              <p className="text-gray-400">{a.status}</p>
            </div>
            {a.status === "PENDING" && (
              <button
                onClick={() => clicked(a.id, "CANCELLED")}
                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-500"
              >
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
