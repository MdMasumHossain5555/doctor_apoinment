"use client";
import React from "react";
import Link from "next/link";

export default function DoctorCard({ doctor, onBook }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center space-y-2">
      <Link
        href={doctor.photo}
        alt={doctor.name}
        className="w-24 h-24 rounded-full object-cover"
      />
      <h3 className="text-lg font-semibold">{doctor.name}</h3>
      <p className="text-gray-500">{doctor.specialization}</p>
      <button
        onClick={() => onBook(doctor)}
        className="mt-2 w-full bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-500"
      >
        Book Appointment
      </button>
    </div>
  );
}
