import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import

export default function AdmissionForm() {
  const navigate = useNavigate(); // ✅ hook

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    mode: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🎉 Admission Done Successfully!");
    console.log(formData);

    // ✅ Home redirect
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Admission Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-black font-semibold mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border-2 border-red-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
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
              className="w-full border-2 border-red-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
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
              title="Enter 10 digit mobile number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-2 border-red-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Course Dropdown */}
          <div>
            <label className="block text-black font-semibold mb-1">
              Select Course
            </label>
            <select
              name="course"
              required
              value={formData.course}
              onChange={handleChange}
              className="w-full border-2 border-red-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">-- Select Course --</option>
              {courses.map((course, idx) => (
                <option key={idx} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Online / Offline Selection */}
          <div>
            <label className="block text-black font-semibold mb-2">
              Course Mode
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="mode"
                  value="Online"
                  checked={formData.mode === "Online"}
                  onChange={handleChange}
                  className="text-red-600 focus:ring-red-600"
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
                  className="text-red-600 focus:ring-red-600"
                  required
                />
                <span>Offline</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
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
