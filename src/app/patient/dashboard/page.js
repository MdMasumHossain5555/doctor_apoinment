"use client";
import React, { useState, useEffect } from "react";
import DoctorCard from "../../../components/DoctorCard";
import AppointmentModal from "../../../components/modal/ApoinmentModal";
import AppointmentList from "../../../components/ApoinmentList";
import { getAllDoctors } from "@/lib/api/doctor";
import { getAllSpecializations } from "@/lib/api/specializations";
import { getPatinetAppointments } from "@/lib/api/patientApoinment";

export default function Dashboard() {
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);


  useEffect(() => {
    // Fetch specializations from API
    const specializations = async () => {
      try {
        const res = await getAllSpecializations();
        if (res.status === 200) {
          // console.log(res.data.data);
          setSpecializations(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching specializations:", error);
      }
    };
    specializations();

    // Fetch doctors from API
    const fetchDoctors = async () => {
      try {
        const res = await getAllDoctors({
          page: 1,
          limit: 10,
          search: "",
          specialization: "",
        });
        if (res.status === 200) {
          setDoctors(res.data.data);
          // console.log(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();

    // Fetch patient appointments from API
    const fetchAppointments = async () => {
      try {
        const res = await getPatinetAppointments({ status: "", page: 1 });
        if (res.status === 200) {
          console.log("Appointments from patient:", res.data);
          setAppointments(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  // const appointments = [
  //   { id: 1, doctor: "Dr. John Doe", date: "2025-09-10", status: "Pending" },
  //   {
  //     id: 2,
  //     doctor: "Dr. Jane Smith",
  //     date: "2025-09-12",
  //     status: "Completed",
  //   },
  // ];

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
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
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
