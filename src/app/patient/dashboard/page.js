"use client";
import React, { useState, useEffect } from "react";
import DoctorCard from "../../../components/DoctorCard";
import AppointmentModal from "../../../components/modal/ApoinmentModal";
import AppointmentList from "../../../components/ApoinmentList";
import { getAllDoctors } from "@/lib/api/doctor";
import { getAllSpecializations } from "@/lib/api/specializations";
import {
  getPatinetAppointments,
  createAppointment,
} from "@/lib/api/patientApoinment";
import { updateAppointmentStatus } from "@/lib/api/updateStatus";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStatus,
  setAppointments,
  addAppointment,
} from "@/features/appointments/appointmentsSlice";
import Swal from "sweetalert2";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const appointments = useSelector((state) => state.appointments.list);
  const [page, setPage] = useState(1);
  const perPage = 6;
  const totalPages = Math.ceil(doctors.length / perPage);
  const token = useSelector((state) => state?.auth?.token);

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
          // setAppointments(res.data.data);
          dispatch(setAppointments(res.data.data));
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  // Update appointment status
  const handleStuatusUpdate = async (appointmentId, status) => {
    try {
      const res = await updateAppointmentStatus(appointmentId, status);
      if (res.status === 200) {
        dispatch(updateStatus({ id: appointmentId, status }));
        Swal.fire({
          title: "Appointment status updated successfully!",
          icon: "success",
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
      alert("Failed to update appointment status");
    }
  };

  const filteredDoctors = doctors
    .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
    .filter((d) => filter === "All" || d.specialization === filter);

  const paginatedDoctors = filteredDoctors.slice(
    (page - 1) * perPage,
    page * perPage
  );

  // Create apoinment
  const handleCreateAppointment = async (data) => {
    console.log("Creating appointment with data:", data);
    if (!token) {
      window.location.href = "/pages/login";
    } else {
      try {
        const res = await createAppointment(data);
        if (res.status === 201) {
          dispatch(addAppointment(res.data.data));
          Swal.fire({
            title: "Appointment created successfully!",
            icon: "success",
            draggable: true,
          });
          setIsModalOpen(false);
        }
      } catch (error) {
        if(error.response?.status === 409){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Appointment already booked for this doctor and time!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to create appointment!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      }
    }
  };

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
          className="border border-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 p-2 rounded w-1/2"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 p-2 rounded"
        >
          <option value="All">All Specializations</option>
          {specializations.map((spec, idx) => (
            <option key={idx} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedDoctors.map((d) => (
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

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1 border rounded">{page}</span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        doctor={selectedDoctor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        clicke={(doctor, date) => {
          console.log("Data received from modal:", doctor, date);
          const data = { doctorId: doctor, date };
          // setData({ doctorId: doctor.id, date });
          handleCreateAppointment(data);
        }}
      />

      {/* My Appointments */}

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">My Appointments</h2>
        <AppointmentList
          appointments={appointments}
          clicked={(appointmentId, status) =>
            handleStuatusUpdate(appointmentId, status)
          }
        />
      </div>
    </div>
  );
}
