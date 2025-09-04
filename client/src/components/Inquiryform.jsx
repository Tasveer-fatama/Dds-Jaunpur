import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: ""
  });

  const [popup, setPopup] = useState(""); // ✅ popup message
  const [popupType, setPopupType] = useState("success"); // ✅ success/error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation check
    if (!formData.name || !formData.email || !formData.phone || !formData.course || !formData.message) {
      setPopup("⚠️ Please fill all required fields!");
      setPopupType("error");
      setTimeout(() => setPopup(""), 3000);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/inquiry", formData);
      if (res.data.success) {
        setPopup("✅ Successfully Submitted!");
        setPopupType("success");
        setFormData({ name: "", email: "", phone: "", course: "", message: "" });

        setTimeout(() => setPopup(""), 3000);
      }
    } catch (err) {
      console.error(err);
      setPopup("❌ Something went wrong!");
      setPopupType("error");
      setTimeout(() => setPopup(""), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-900 to-black p-6 relative">
      
      {/* ✅ Popup Notification */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            className={`fixed top-5 right-5 px-6 py-3 rounded-lg shadow-lg z-50 
              ${popupType === "success" ? "bg-black text-white" : "bg-red-600 text-white"}`}
          >
            {popup}
          </motion.div>
        )}
      </AnimatePresence>

      <Tilt className="w-full max-w-md">
        <motion.div className="bg-black/60 rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Student Inquiry Form</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text" name="name" placeholder="Full Name"
              value={formData.name} onChange={handleInputChange}
              required
              className="w-full p-3 rounded bg-black/40 text-white border border-red-400"
            />
            <input
              type="email" name="email" placeholder="Email"
              value={formData.email} onChange={handleInputChange}
              required
              className="w-full p-3 rounded bg-black/40 text-white border border-red-400"
            />
            <input
              type="tel" name="phone" placeholder="Phone"
              value={formData.phone} onChange={handleInputChange}
              required
              className="w-full p-3 rounded bg-black/40 text-white border border-red-400"
            />
            <select
              name="course" value={formData.course} onChange={handleInputChange}
              required
              className="w-full p-3 rounded bg-black/40 text-white border border-red-400"
            >
              <option value="">Select Course</option>
              <option value="spoken">Spoken English</option>
              <option value="computer">Computer Course</option>
              <option value="both">Both</option>
            </select>
            <textarea
              name="message" placeholder="Your Message"
              value={formData.message} onChange={handleInputChange}
              required
              className="w-full p-3 rounded bg-black/40 text-white border border-red-400"
            ></textarea>

            <button type="submit" className="w-full py-3 bg-red-600 text-white rounded-lg">
              Submit Inquiry
            </button>
          </form>
        </motion.div>
      </Tilt>
    </div>
  );
}
