"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStatus } from "../../../features/appointments/appointmentsSlice";

export default function DoctorDashboard() {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.list);

  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = appointments.filter((a) => {
    const statusMatch = filterStatus === "All" || a.status === filterStatus;
    const dateMatch = !filterDate || a.date === filterDate;
    return statusMatch && dateMatch;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleUpdateStatus = (id, status) => {
    if (confirm(`Mark appointment as ${status}?`)) {
      dispatch(updateStatus({ id, status }));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Doctor Dashboard</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Appointment Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Patient</th>
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Time</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="border p-2">{a.patient}</td>
                <td className="border p-2">{a.date}</td>
                <td className="border p-2">{a.time}</td>
                <td className="border p-2">{a.status}</td>
                <td className="border p-2 space-x-2">
                  {a.status !== "Completed" && (
                    <button
                      onClick={() => handleUpdateStatus(a.id, "Completed")}
                      className="px-2 py-1 rounded bg-green-600 text-white hover:bg-green-500"
                    >
                      Completed
                    </button>
                  )}
                  {a.status !== "Cancelled" && (
                    <button
                      onClick={() => handleUpdateStatus(a.id, "Cancelled")}
                      className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-500"
                    >
                      Cancelled
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </div>
  );
}
