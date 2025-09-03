import React from "react";
import { motion } from "framer-motion";

export default function CertificateDownload() {
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
        <form className="space-y-5">
          {/* Roll Number */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Roll Number
            </label>
            <input
              type="text"
              placeholder="Enter your Roll Number"
              className="w-full px-4 py-2 border border-red-500/50 bg-black/40 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-red-500/50 bg-black/40 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
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
      </motion.div>

      {/* Footer text */}
      <p className="mt-6 text-sm text-gray-300 text-center max-w-md">
        Enter your registered <span className="text-red-400">Roll Number</span> 
        and <span className="text-red-400">Date of Birth</span> to 
        access and download your certificate instantly.
      </p>
    </div>
  );
}
