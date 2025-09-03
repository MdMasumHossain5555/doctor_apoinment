"use client";
import { useState } from "react";

export default function RoleSwitch({ roleProp }) {
  const [role, setRole] = useState("patient");
  //   const handleRoleChange = (event) => {
  //     setRole(event.target.value);
  //   };
  const roleChange = (newRole) => {
    setRole(newRole);
    if (roleProp){
        roleProp(newRole);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative flex w-60 rounded-full bg-gray-200 p-1">
        {/* Switch background highlight */}
        <div
          className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-blue-500 transition-all duration-300 ${
            role === "doctor" ? "left-1/2" : "left-1"
          }`}
        ></div>

        {/* Patient button */}
        <button
          onClick={() => roleChange("patient")}
          className={`relative z-10 w-1/2 px-4 py-2 text-sm font-medium transition-colors duration-300 ${
            role === "patient" ? "text-white" : "text-gray-600"
          }`}
        >
          Patient
        </button>

        {/* Doctor button */}
        <button
          onClick={() => roleChange("doctor")}
          className={`relative z-10 w-1/2 px-4 py-2 text-sm font-medium transition-colors duration-300 ${
            role === "doctor" ? "text-white" : "text-gray-600"
          }`}
        >
          Doctor
        </button>
      </div>
    </div>
  );
}
