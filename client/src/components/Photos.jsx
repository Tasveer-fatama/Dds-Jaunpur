import React from "react";
import { motion } from "framer-motion";
import { FaFacebook } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

// 🔗 Apna Facebook Page ka link yahan daal do
const FACEBOOK_PAGE_URL = "https://www.facebook.com/arti.singh.182";

const ImageWall = () => {
  // Saare image links ek hi array mein (40+)
  const images = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
    "/image4.jpg",
    "/image5.jpg",
    "/image6.jpg",
    "/image7.jpg",
    "/image8.jpg",
    "/image9.jpg",
    "/image10.jpg",
    "/image11.jpg",
    "/image12.jpg",
  ];

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  // 6 images per row, two marquee rows
  const rows = chunkArray(images, 6);

  return (
    <div className="bg-[#0B0B0F]">
      {/* Hero Section */}
      <div className="relative w-full h-[260px] md:h-[380px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#141420] via-[#0B0B0F] to-[#1A1024]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#E1306C_0%,transparent_45%),radial-gradient(circle_at_80%_70%,#1877F2_0%,transparent_45%)]" />
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <p className="uppercase tracking-[0.35em] text-xs md:text-sm text-[#E1306C] font-semibold mb-3">
            Gallery
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            Our Program Moments
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/60 max-w-xl mx-auto">
            A glimpse into the sessions, faces, and energy from our community.
          </p>
        </div>
      </div>

      {/* Image Rows — 6 per row */}
      <div className="py-10 md:py-14 space-y-6 md:space-y-8 overflow-hidden">
        {rows.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            className="flex"
            initial={{ x: rowIndex % 2 === 0 ? "0%" : "-100%" }}
            animate={{ x: rowIndex % 2 === 0 ? "-100%" : "0%" }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          >
            {row.concat(row).map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[46vw] h-[34vw] sm:w-64 sm:h-48 md:w-80 md:h-60 mx-2 md:mx-3 rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/10 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:ring-[#E1306C]/50 cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Program highlight ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Explore More / Facebook CTA */}
      <div className="flex flex-col items-center justify-center pb-16 px-6">
        <a
          href={FACEBOOK_PAGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-4"
        >
          <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#1877F2] shadow-[0_0_30px_rgba(24,119,242,0.5)] transition-transform duration-300 group-hover:scale-110">
            <FaFacebook className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </span>
          <span className="flex items-center gap-1.5 text-white/90 group-hover:text-white text-sm md:text-base font-semibold tracking-wide transition-colors">
            Explore More Images on Facebook
            <FiArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </a>
      </div>
    </div>
  );
};

export default ImageWall;