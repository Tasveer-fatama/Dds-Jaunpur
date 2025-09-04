import React from "react";
import { motion } from "framer-motion";

const OnlineCourses = () => {
  const courses = [
    {
      title: "Basic English",
      desc: "Learn essential English communication skills to build confidence in speaking and writing.",
    },
    {
      title: "Basic Computer",
      desc: "Understand computer fundamentals, MS Office, and internet basics for daily use.",
    },
    {
      title: "HTML & CSS",
      desc: "Learn to design and style modern, responsive web pages with HTML and CSS.",
    },
    {
      title: "JavaScript & React.js",
      desc: "Master JavaScript and build dynamic frontends using React.js framework.",
    },
    {
      title: "MERN Stack",
      desc: "Full stack development with MongoDB, Express, React, and Node.js for real-world projects.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-cover bg-center text-white bg-black"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl px-6 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-bold">
            <span className="border-l-4 border-red-500 pl-2">Online Courses</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Learn from anywhere with our expert-led online programs designed for beginners to professionals.
          </p>
        </motion.div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border-t-4 border-red-600"
          >
            <h3 className="text-xl font-bold text-red-600 mb-3">{course.title}</h3>
            <p className="text-gray-600">{course.desc}</p>
            <a
  href="/AdmissionForm"
  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition inline-block"
>
  Enroll Now
</a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OnlineCourses;
