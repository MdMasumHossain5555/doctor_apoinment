"use client";
import Image from "next/image";
import doctorImg from "../../public/doctor.png";
import Link from "next/link";
import { FadeLoader } from "react-spinners";
import React, { useState } from "react";
export default function Home() {
  const [loading, setLoading] = useState(false);
  const specialties = ["Cardiology", "Dentistry", "Orthopedics", "Dermatology"];
  const blogs = [
    {
      title: "5 Tips for Healthy Heart",
      author: "Dr. John Doe",
      date: "Aug 10, 2025",
    },
    {
      title: "Dental Care at Home",
      author: "Dr. Jane Smith",
      date: "Aug 12, 2025",
    },
    {
      title: "Skin Care Routine",
      author: "Dr. Emily Clark",
      date: "Aug 15, 2025",
    },
  ];

  return (
    <>
      <div>
        <div className="bg-gray-50">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-r from-blue-100 to-white min-h-screen flex items-center">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
              {/* Text */}
              <div className="md:w-1/2 text-center md:text-left">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">
                  Find Top Doctors Near You
                </h1>
                <p className="text-gray-600  mb-6 text-lg">
                  Book appointments quickly and consult certified doctors from
                  your home.
                </p>
                <Link href="/patient/dashboard">
                  <button
                    onClick={() => setLoading(true)}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
                  >
                    Book Appointment
                  </button>
                </Link>
                {loading && (
                  <div className="flex w-full absolute items-center justify-center mt-4">
                    <FadeLoader color="#118bdc" loading={loading} />
                  </div>
                )}
              </div>

              {/* Image */}
              <div className="md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0 relative">
                {/* <div className="absolute -left-16 top-0 w-48 h-full bg-blue-200 rounded-r-full transform rotate-12 hidden md:block"></div> */}
                <Image
                  src={doctorImg}
                  alt="Doctor"
                  width={600}
                  height={600}
                  className="rounded-lg  relative z-10"
                />
              </div>
            </div>
          </section>

          {/* Banner Section */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-400 py-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Book your appointment in seconds!
            </h2>
            <p className="mt-2 text-gray-100">
              Safe, easy, and fast consultation with top doctors in your city.
            </p>
          </section>

          {/* Popular Specialties */}
          <section className="py-16 px-6">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Popular Specialties
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {specialties.map((spec) => (
                <div
                  key={spec}
                  className="border rounded-xl p-6 shadow hover:shadow-lg cursor-pointer text-center transition"
                >
                  <p className="font-medium">{spec}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Blog / Articles Section */}
          <section className="bg-gray-100 py-16 px-6">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Health Tips & Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map((blog, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer"
                >
                  <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {blog.author} • {blog.date}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla et euismod nulla.
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
