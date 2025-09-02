"use client";
import React, { useState } from "react";
import DoctorCard from "../../../components/DoctorCard";
import AppointmentModal from "../../../components/modal/ApoinmentModal";
import AppointmentList from "../../../components/ApoinmentList";

export default function Dashboard() {
  const doctors = [
    {
      id: 1,
      name: "Dr. John Doe",
      specialization: "Cardiologist",
      photo: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      specialization: "Dentist",
      photo: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      id: 3,
      name: "Dr. Mike Lee",
      specialization: "Neurologist",
      photo: "https://randomuser.me/api/portraits/men/13.jpg",
    },
    // ... more doctors
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const appointments = [
    { id: 1, doctor: "Dr. John Doe", date: "2025-09-10", status: "Pending" },
    {
      id: 2,
      doctor: "Dr. Jane Smith",
      date: "2025-09-12",
      status: "Completed",
    },
  ];

  const filteredDoctors = doctors
    .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
    .filter((d) => filter === "All" || d.specialization === filter);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Doctor List</h1>

      {/* Search & Filter */}
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All Specializations</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dentist">Dentist</option>
          <option value="Neurologist">Neurologist</option>
        </select>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredDoctors.map((d) => (
          <DoctorCard
            key={d.id}
            doctor={d}
            onBook={(doctor) => {
              setSelectedDoctor(doctor);
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        doctor={selectedDoctor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* My Appointments */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">My Appointments</h2>
        <AppointmentList appointments={appointments} />
      </div>
    </div>
  );
}
