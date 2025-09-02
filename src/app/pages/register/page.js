"use client";
import React, { useState } from "react";
import RoleSwitch from "../../../components/Switch";
import Link from "next/link";

export default function Register() {
  const [role, setRole] = useState("patient");

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    photo_url: "",
  });

  // Error state
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    photo_url: "",
  });

  // Validation functions
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) ? "" : "Invalid email address";
  };

  const validatePassword = (value) => {
    return value.length >= 6 ? "" : "Password must be at least 6 characters";
  };

  const validateName = (value) => {
    return value.trim() !== "" ? "" : "Name is required";
  };

  const validatePhotoURL = (value) => {
    return value.trim() !== "" ? "" : "Photo URL is required";
  };

  const validateSpecialization = (value) => {
    return value.trim() !== "" ? "" : "Specialization is required";
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Real-time validation
    let error = "";
    switch (name) {
      case "name":
        error = validateName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
      case "photo_url":
        error = validatePhotoURL(value);
        break;
      case "specialization":
        if (role === "doctor") error = validateSpecialization(value);
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check all validations before submit
    const newErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      photo_url: validatePhotoURL(form.photo_url),
      specialization: role === "doctor" ? validateSpecialization(form.specialization) : "",
    };
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => err !== "");
    if (!hasError) {
      console.log("Form Submitted ✅", { ...form, role });
      alert("Registration successful!");
      // Submit form logic here
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <h1 className="mx-auto h-10 w-auto text-blue-400 text-3xl font-bold">
        DOCTOR&#39;S
      </h1>
      <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
        Register your account
      </h2>

      {/* Role Switch */}
      <div className="mt-6 flex justify-center">
        <RoleSwitch roleProp={(selectedRole) => setRole(selectedRole)} />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label
              htmlFor="photo_url"
              className="block text-sm font-medium text-gray-900"
            >
              Photo URL
            </label>
            <div className="mt-2">
              <input
                id="photo_url"
                name="photo_url"
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={form.photo_url}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
              {errors.photo_url && (
                <p className="text-red-500 text-sm mt-1">{errors.photo_url}</p>
              )}
            </div>
          </div>

          {/* Specialization (Doctor Only) */}
          {role === "doctor" && (
            <div>
              <label
                htmlFor="specialization"
                className="block text-sm font-medium text-gray-900"
              >
                Specialization
              </label>
              <div className="mt-2">
                <input
                  id="specialization"
                  name="specialization"
                  type="text"
                  value={form.specialization}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
                {errors.specialization && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.specialization}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Are you a registered user?{" "}
          <Link
            href="/pages/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Login Now.
          </Link>
        </p>
      </div>
    </div>
  );
}
