import React, { useState } from "react";
import { motion } from "framer-motion";

export default function CertificateDownload() {
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    dob: "",
  });
  const [error, setError] = useState("");
  const [certificate, setCertificate] = useState(null);

  // ✅ Dummy Student Data (backend API se bhi aa sakta h)
  const students = [
    {
      name: "Rahul Sharma",
      roll: "12345",
      dob: "2000-05-10",
      certificate: "/certificates/rahul.pdf",
    },
    {
      name: "Priya Verma",
      roll: "67890",
      dob: "1999-12-25",
      certificate: "/certificates/priya.pdf",
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const student = students.find(
      (s) =>
        s.name.toLowerCase() === formData.name.trim().toLowerCase() &&
        s.roll === formData.roll.trim() &&
        s.dob === formData.dob
    );

    if (student) {
      setCertificate(student.certificate);
      setError("");
    } else {
      setCertificate(null);
      setError("❌ Wrong Input! Please check your details.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-red-900 to-black p-6">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-white mb-8 text-center drop-shadow-lg"
      >
        🎓 Get Your <span className="text-red-500">Certificate</span>
      </motion.h1>

      {/* Search Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-md border border-red-400/30 rounded-2xl shadow-2xl p-8 w-[90vw] max-w-lg"
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Student Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Student Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-red-500/50 bg-black/40 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
              required
            />
          </div>

          {/* Roll Number */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Roll Number
            </label>
            <input
              type="text"
              name="roll"
              placeholder="Enter your Roll Number"
              value={formData.roll}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-red-500/50 bg-black/40 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-red-500/50 bg-black/40 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
              required
            />
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-300"
          >
            🔎 Search & Download
          </motion.button>
        </form>

        {/* Error Message */}
        {error && <p className="mt-4 text-red-400 text-center">{error}</p>}

        {/* Certificate Link */}
        {certificate && (
          <div className="mt-6 text-center">
            <a
              href={certificate}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300"
            >
              📥 Download Certificate (PDF)
            </a>
          </div>
        )}
      </motion.div>

      {/* Footer text */}
      <p className="mt-6 text-sm text-gray-300 text-center max-w-md">
        Enter your registered{" "}
        <span className="text-red-400">Name, Roll Number</span> and{" "}
        <span className="text-red-400">Date of Birth</span> to access and
        download your certificate instantly.
      </p>
    </div>
  );
}