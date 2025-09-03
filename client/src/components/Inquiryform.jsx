import React, { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: ""
  });

  const [focusedFields, setFocusedFields] = useState({
    name: false,
    email: false,
    phone: false,
    course: false,
    message: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (field) => {
    setFocusedFields(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleBlur = (field) => {
    setFocusedFields(prev => ({
      ...prev,
      [field]: formData[field] !== ""
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-900 to-black p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-red-500/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        perspective={1000}
        scale={1.02}
        transitionSpeed={1500}
        glareEnable={true}
        glareMaxOpacity={0.1}
        glareColor="#ffffff"
        glarePosition="all"
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-gradient-to-b from-black/70 to-red-900/30 backdrop-blur-xl border border-red-500/30 rounded-3xl shadow-2xl p-8 relative overflow-hidden"
        >
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-red-500/50 rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-red-500/50 rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-red-500/50 rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-red-500/50 rounded-br-2xl"></div>

          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-center text-white mb-2"
          >
            Student Inquiry Form
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center text-red-200/80 mb-6 text-sm"
          >
            Let us know how we can help you
          </motion.p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="relative">
              <label 
                htmlFor="name" 
                className={`absolute left-4 transition-all duration-300 ${
                  focusedFields.name || formData.name 
                    ? "top-0 text-xs text-red-400 bg-black px-2 py-0 -mt-2.5 z-10" 
                    : "top-3 text-white/70"
                }`}
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => handleFocus("name")}
                onBlur={() => handleBlur("name")}
                className="w-full mt-1 px-4 py-3 border border-red-400/30 bg-black/40 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <label 
                htmlFor="email" 
                className={`absolute left-4 transition-all duration-300 ${
                  focusedFields.email || formData.email 
                    ? "top-0 text-xs text-red-400 bg-black px-2 py-0 -mt-2.5 z-10" 
                    : "top-3 text-white/70"
                }`}
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
                className="w-full mt-1 px-4 py-3 border border-red-400/30 bg-black/40 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Phone Field */}
            <div className="relative">
              <label 
                htmlFor="phone" 
                className={`absolute left-4 transition-all duration-300 ${
                  focusedFields.phone || formData.phone 
                    ? "top-0 text-xs text-red-400 bg-black px-2 py-0 -mt-2.5 z-10" 
                    : "top-3 text-white/70"
                }`}
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                onFocus={() => handleFocus("phone")}
                onBlur={() => handleBlur("phone")}
                className="w-full mt-1 px-4 py-3 border border-red-400/30 bg-black/40 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Course Select */}
            <div className="relative">
              <label 
                htmlFor="course" 
                className={`absolute left-4 transition-all duration-300 ${
                  focusedFields.course || formData.course 
                    ? "top-0 text-xs text-red-400 bg-black px-2 py-0 -mt-2.5 z-10" 
                    : "top-3 text-white/70"
                }`}
              >
                Select Course
              </label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                onFocus={() => handleFocus("course")}
                onBlur={() => handleBlur("course")}
                className="w-full mt-1 px-4 py-3 border border-red-400/30 bg-black/40 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none appearance-none transition-all duration-300"
              >
                <option value=""></option>
                <option value="spoken">Spoken English</option>
                <option value="computer">Computer Course</option>
                <option value="both">Both Courses</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Message Field */}
            <div className="relative">
              <label 
                htmlFor="message" 
                className={`absolute left-4 transition-all duration-300 ${
                  focusedFields.message || formData.message 
                    ? "top-0 text-xs text-red-400 bg-black px-2 py-0 -mt-2.5 z-10" 
                    : "top-3 text-white/70"
                }`}
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleInputChange}
                onFocus={() => handleFocus("message")}
                onBlur={() => handleBlur("message")}
                className="w-full mt-1 px-4 py-3 border border-red-400/30 bg-black/40 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all duration-300 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-red-500/30 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Submit Inquiry</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <motion.div 
                className="absolute inset-0 bg-white/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </form>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center text-red-200/50 text-xs mt-6"
          >
            We'll get back to you within 24 hours
          </motion.p>
        </motion.div>
      </Tilt>
    </div>
  );
}