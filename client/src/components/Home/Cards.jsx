import React from "react";
import {
  FaLaptopCode,
  FaReact,
  FaDatabase,
  FaBook,
  FaFileInvoice,
  FaArrowRight,
} from "react-icons/fa";

const courses = [
  {
    title: "DCA",
    desc: "Diploma in Computer Applications covering basics of IT, MS Office, Internet, and productivity tools.",
    icon: <FaBook />,
  },
  {
    title: "ADCA",
    desc: "Advanced Diploma in Computer Applications focusing on programming, databases, and office automation.",
    icon: <FaLaptopCode />,
  },
  {
    title: "Tally",
    desc: "Learn Tally ERP for accounting, GST, inventory, and financial management.",
    icon: <FaFileInvoice />,
  },
  {
    title: "MERN Stack",
    desc: "Full-stack development with MongoDB, Express, React, and Node.js to build modern web apps.",
    icon: <FaDatabase />,
  },
  {
    title: "React",
    desc: "Learn React.js from basics to advanced, including hooks, state management, and modern UI design.",
    icon: <FaReact />,
  },
];

const DDSCourses = () => {
  return (
    <section className="relative bg-gradient-to-br from-white via-red-50 to-white py-24 px-6 overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/20 rounded-full blur-3xl" />

      {/* Heading */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Our <span className="text-red-600">Courses</span>
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Industry-focused programs designed to build real-world skills and boost your career growth.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {courses.map((course, idx) => (
          <div
            key={idx}
            className="group relative bg-white/80 backdrop-blur-xl border border-red-100 rounded-3xl p-8 shadow-lg transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-red-200"
          >
            {/* Gradient Hover Overlay */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-5">
              
              {/* Icon */}
              <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-red-100 text-red-600 text-4xl shadow-md transform transition-all duration-500 group-hover:bg-white group-hover:text-red-600 group-hover:scale-110 group-hover:-translate-y-2">
                {course.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-800 group-hover:text-white">
                {course.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed group-hover:text-red-100">
                {course.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Explore More Button */}
      <div className="relative z-10 mt-20 flex justify-center">
        <a
          href="/OfflineCourses"
          className="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-white bg-gradient-to-r from-red-600 to-red-700 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          Explore More Courses
          <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
};

export default DDSCourses;
