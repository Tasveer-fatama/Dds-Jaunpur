import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

export default function CertificateDownload() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    dob: "",
  });

  const [error, setError] = useState("");
  const [pdf, setPdf] = useState("");
  const [success, setSuccess] = useState(false);

  // input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔍 search
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        "https://ddsgroup.onrender.com/api/certificate/search",
        {
          params: formData,
        }
      );

      setPdf(res.data.pdfUrl); // ✅ FIXED
      setError("");
    } catch {
      setPdf("");
      setError("❌ Record not found");
    }
  };

  // 📥 download
  const handleDownload = () => {
    window.open(pdf, "_blank"); // ✅ FIXED

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });

    setSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-red-900 to-black p-6">

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white mb-8"
      >
        🎓 Download Certificate
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-md border border-red-400/30 rounded-2xl shadow-2xl p-8 w-[90vw] max-w-lg"
      >

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            placeholder="Student Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-black/40 border border-red-400 text-white rounded-xl"
          />

          <input
            placeholder="Roll Number"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-black/40 border border-red-400 text-white rounded-xl"
          />

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-black/40 border border-red-400 text-white rounded-xl"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold"
          >
            🔎 Search
          </motion.button>

        </form>

        {error && (
          <p className="mt-4 text-red-400 text-center">{error}</p>
        )}

        {pdf && !success && (
          <div className="mt-6 text-center">
            <button
              onClick={handleDownload}
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
            >
              📥 Download Certificate
            </button>
          </div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center"
          >
            <p className="text-green-400 text-lg font-semibold">
              ✅ Download Started
            </p>
            <p className="text-gray-300">
              Redirecting to home...
            </p>
          </motion.div>
        )}

      </motion.div>

      <p className="mt-6 text-sm text-gray-300 text-center max-w-md">
        Enter Name, Roll Number and DOB to download certificate instantly.
      </p>

    </div>
  );
}