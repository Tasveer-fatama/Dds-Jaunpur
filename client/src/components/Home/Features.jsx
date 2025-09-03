import React from "react";
import {
  FaLightbulb,
  FaChartLine,
  FaDesktop,
  FaGraduationCap,
  FaCogs,
  FaGlobe,
} from "react-icons/fa";

const features = [
  {
    title: "Spoken English & Personality Development",
    icon: <FaLightbulb className="w-12 h-12 text-red-600" />,
    description:
      "Boost your confidence with English communication, public speaking, and personality development training.",
  },
  {
    title: "Computer Training Programs",
    icon: <FaDesktop className="w-12 h-12 text-red-600" />,
    description:
      "Industry & Govt.-certified courses: O Level, ADCA, CCC, Tally, Java, Python & more.",
  },
  {
    title: "15+ Years of Excellence",
    icon: <FaGraduationCap className="w-12 h-12 text-red-600" />,
    description:
      "DDS The Group of Institutions has been transforming students’ futures with quality education for over 15 years.",
  },
  {
    title: "Career-Focused Training",
    icon: <FaChartLine className="w-12 h-12 text-red-600" />,
    description:
      "Get job-oriented skills and practical knowledge for real-world success.",
  },
  {
    title: "Govt. Recognized Certification",
    icon: <FaCogs className="w-12 h-12 text-red-600" />,
    description:
      "All programs are certified and recognized, giving you an edge in jobs & higher studies.",
  },
  {
    title: "Global Learning Standards",
    icon: <FaGlobe className="w-12 h-12 text-red-600" />,
    description:
      "Our teaching methods are aligned with global standards for holistic development.",
  },
];

const DDSFeatures = () => {
  return (
    <div className="relative w-full min-h-screen bg-white text-black flex items-center justify-center px-8 py-16 overflow-hidden">
      {/* Left Side - Image */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-black  z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 w-full max-w-6xl">
        {/* Left Side - Image */}
        <div className="md:w-1/3 transform transition-transform duration-500 hover:scale-105">
          <img
            src="/Collegegirl.png"
            alt="DDS Student"
            className="rounded-lg shadow-2xl "
          />
        </div>

        {/* Right Side - Text and Features */}
        <div className="md:w-2/3">
          <h2 className="text-3xl md:text-5xl font-bold text-red-600">
            DDS The Group of Institutions
            <span className="text-red-600"> — Key Highlights</span>
          </h2>
          <p className="text-gray-700 mt-4 text-lg">
            At <span className="font-bold text-red-600">DDS Jaunpur</span>, we are
            committed to empowering students with{" "}
            <span className="text-red-600 font-semibold">English Communication</span>,{" "}
            <span className="text-red-600 font-semibold">Computer Education</span> and
            career-focused training. With{" "}
            <strong className="text-black">25+ years of excellence</strong>, DDS
            ensures practical knowledge, global exposure, and recognized
            certifications.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col p-6 bg-black text-white rounded-lg shadow-lg border-l-4 border-red-600 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-600 rounded-full opacity-20 transform translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-0 left-0 w-16 h-16 bg-red-600 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};

export default DDSFeatures;
