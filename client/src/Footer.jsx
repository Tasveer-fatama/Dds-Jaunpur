import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-8 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Institution Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-red-600">DDS Institutions</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Providing quality education in English Communication and Computer Education for over 15 years.
            </p>
            <div className="flex flex-wrap gap-3 text-lg">
              <a href="#" className="hover:text-red-600 transition-colors"><FaFacebook /></a>
              <a href="#" className="hover:text-red-600 transition-colors"><FaTwitter /></a>
              <a href="#" className="hover:text-red-600 transition-colors"><FaInstagram /></a>
              <a href="#" className="hover:text-red-600 transition-colors"><FaYoutube /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 sm:mb-6 border-b border-red-600 pb-2">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-red-600 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-600 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-600 transition-colors">Courses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-600 transition-colors">Admissions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-600 transition-colors">Results</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-lg font-semibold mb-4 sm:mb-6 border-b border-red-600 pb-2">Our Courses</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-red-600 transition-colors">Spoken English</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-600 transition-colors">Personality Development</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-600 transition-colors">Basic Computer Courses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-600 transition-colors">Advanced Programming</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-600 transition-colors">Digital Marketing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-600 transition-colors">Graphic Design</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 sm:mb-6 border-b border-red-600 pb-2">Contact Us</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-red-600 mt-1" />
                <span className="text-gray-300 text-sm sm:text-base">123 Education Street, Knowledge City, 100001</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-red-600" />
                <span className="text-gray-300 text-sm sm:text-base">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-red-600" />
                <span className="text-gray-300 text-sm sm:text-base">info@ddsinstitutions.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-400 text-xs sm:text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} DDS The Group of Institutions. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#" className="text-gray-400 hover:text-red-600 text-xs sm:text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-red-600 text-xs sm:text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-red-600 text-xs sm:text-sm transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
