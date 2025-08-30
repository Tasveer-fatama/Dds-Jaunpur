import React from "react";
import { FaLaptopCode, FaReact, FaDatabase, FaBook, FaFileInvoice } from "react-icons/fa";

const courses = [
  {
    title: "DCA",
    desc: "Diploma in Computer Applications covering basics of IT, MS Office, Internet, and productivity tools.",
    icon: <FaBook className="text-5xl text-red-600 group-hover:text-white transition-colors duration-300" />,
  },
  {
    title: "ADCA",
    desc: "Advanced Diploma in Computer Applications focusing on programming, databases, and office automation.",
    icon: <FaLaptopCode className="text-5xl text-red-600 group-hover:text-white transition-colors duration-300" />,
  },
  {
    title: "Tally",
    desc: "Learn Tally ERP for accounting, GST, inventory, and financial management.",
    icon: <FaFileInvoice className="text-5xl text-red-600 group-hover:text-white transition-colors duration-300" />,
  },
  {
    title: "MERN Stack",
    desc: "Full-stack development with MongoDB, Express, React, and Node.js to build modern web apps.",
    icon: <FaDatabase className="text-5xl text-red-600 group-hover:text-white transition-colors duration-300" />,
  },
  {
    title: "React",
    desc: "Learn React.js from basics to advanced, including hooks, state management, and modern UI design.",
    icon: <FaReact className="text-5xl text-red-600 group-hover:text-white transition-colors duration-300" />,
  },
];

const DDSCourses = () => {
  return (
    <div className="bg-white py-20 px-6 flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-14 text-gray-900">
        Our <span className="text-red-600">Courses</span>
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
        {courses.map((course, idx) => (
          <div
            key={idx}
            className="relative group bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden text-center p-8 cursor-pointer transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-red-200"
          >
            {/* Hover Red Overlay */}
            <div className="absolute inset-0 bg-red-600 translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center space-y-5">
              {/* Icon */}
              <div className="transform transition-transform duration-500 group-hover:scale-125">
                {course.icon}
              </div>
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-800 group-hover:text-white">
                {course.title}
              </h3>
              {/* Description */}
              <p className="text-gray-600 text-sm group-hover:text-gray-100 leading-relaxed">
                {course.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DDSCourses;
