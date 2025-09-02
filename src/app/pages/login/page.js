"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "../../../features/auth/authSlice";
import { loginUser } from "@/lib/api/auth";
import { FadeLoader } from "react-spinners";
import Swal from "sweetalert2";

function Login() {
  const dispatch = useDispatch();
  const { loading, error, token, user } = useSelector((state) => state.auth);
  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  // const [loading, setLoading] = useState(false);

  // error state
  const [errors, setErrors] = useState({ email: "", password: "" });

  // email validation
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      return "Invalid email address";
    }
    return "";
  };

  // password validation
  const validatePassword = (value) => {
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    dispatch(loginStart());

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }
    const credentials = { email, password, role };
    try {
      const res = await loginUser(credentials);
      if (res.status === 200) {
        Swal.fire({
          title: "Login successful!",
          icon: "success",
          draggable: true,
        });
        // alert("Login successful!");
        const user = res.data.data.user;
        dispatch(loginSuccess(res.data.data.token, user));
        localStorage.setItem("token", res.data.data.token);
        // Redirect based on role
        if (role === "patient") {
          setTimeout(() => {
          window.location.href = "/patient/dashboard";
          }, 1500);
        } else if (role === "doctor") {
          setTimeout(() => {
          // window.location.href = "/doctor/dashboard";
          }, 1500);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials. Please try again.");
      } else {
        alert("Login failed. Please try again later.");
      }
    }
    console.log("Form Submitted ✅", { email, password, role });
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <h1 className="mx-auto h-10 w-auto text-blue-400 text-3xl font-bold">
          DOCTOR&#39;S
        </h1>
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>

        <div className="mt-10 mx-auto w-full max-w-sm">
          {loading && (
            <div className="flex items-center justify-center mt-5 absolute sm:mx-auto sm:w-full sm:max-w-sm rounded-md  py-20">
              <FadeLoader color="#118bdc" loading={loading} />
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({
                      ...errors,
                      email: validateEmail(e.target.value),
                    });
                  }}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({
                      ...errors,
                      password: validatePassword(e.target.value),
                    });
                  }}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Role
              </label>
              <div className="mt-2">
                <select
                  name="role"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a registered user?{" "}
            <Link
              href="/pages/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Register Now.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
