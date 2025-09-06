import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function AdmissionForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    mode: "",
  });

  const [popup, setPopup] = useState("");
  const [popupType, setPopupType] = useState("success");

  const courses = [
    "AutoCAD",
    "PDCA (Practical Diploma in Computer Application)",
    "ADCA + CCC",
    "DCA (Diploma in Computer Application)",
    "Tally + GST",
    "Typing (Eng & Hindi)",
    "M. Olevel",
    "Digital Marketing",
    "MERN Stack",
    "HTML & CSS",
    "JavaScript",
    "Java",
    "Python",
    "C",
    "C++",
    "Spoken English",
    "Grammar Classes",
    "Interview Training",
    "GD & PI Classes",
    "Sound Classes (U.S. & U.K.)",
    "Newspaper Grammar Rules",
    "Basic English",
    "Basic Computer",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.course || !formData.mode) {
      setPopup("⚠️ Please fill all fields!");
      setPopupType("error");
      setTimeout(() => setPopup(""), 3000);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/admission/admissionform", formData);

      setPopup(res.data.message || "🎉 Admission Successful!");
      setPopupType("success");

      // Reset form
      setFormData({ name: "", email: "", phone: "", course: "", mode: "" });

      setTimeout(() => {
        setPopup("");
        navigate("/"); // ✅ redirect after success
      }, 3000);
    } catch (error) {
      console.error(error);
      setPopup("❌ Something went wrong!");
      setPopupType("error");
      setTimeout(() => setPopup(""), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 relative">
      {/* ✅ Popup */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className={`fixed top-5 right-5 px-6 py-3 rounded-lg shadow-lg z-50 
              ${popupType === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
          >
            {popup}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Admission Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-black font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border-2 border-red-600 rounded-lg px-3 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-black font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border-2 border-red-600 rounded-lg px-3 py-2"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-black font-semibold mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              required
              pattern="[0-9]{10}"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-2 border-red-600 rounded-lg px-3 py-2"
            />
          </div>

          {/* Course Dropdown */}
          <div>
            <label className="block text-black font-semibold mb-1">Select Course</label>
            <select
              name="course"
              required
              value={formData.course}
              onChange={handleChange}
              className="w-full border-2 border-red-600 rounded-lg px-3 py-2"
            >
              <option value="">-- Select Course --</option>
              {courses.map((course, idx) => (
                <option key={idx} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Mode */}
          <div>
            <label className="block text-black font-semibold mb-2">Course Mode</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="mode"
                  value="Online"
                  checked={formData.mode === "Online"}
                  onChange={handleChange}
                  required
                />
                <span>Online</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="mode"
                  value="Offline"
                  checked={formData.mode === "Offline"}
                  onChange={handleChange}
                  required
                />
                <span>Offline</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-black hover:text-red-600 transition duration-300"
            >
              Submit Admission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
