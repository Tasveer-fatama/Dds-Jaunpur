import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

import Navbaar from "./Navbaar.jsx";
import Footer from "./Footer.jsx";

import Home from "./components/Home/Home.jsx";
import About1 from "./components/About/About1.jsx";
import Digital from "./components/digital.jsx";
import Social from "./components/Social.jsx";
import Seo from "./components/Seo.jsx";
import ContentWriting from "./components/ContentWriting.jsx";
import Graphic from "./components/Graphic.jsx";
import VIdeoEditing from "./components/VIdeoEditing.jsx";
import Web from "./components/Web.jsx";
import Donation from "./components/Donation.jsx";
import Registrationform from "./components/Registrationform.jsx";
import Inquiryform from "./components/Inquiryform.jsx";
import Admissonform from "./components/Admissonform.jsx";
import Videos from "./components/Videos.jsx";
import Photos from "./components/Photos.jsx";
import GetInTouch from "./components/GetInTouch.jsx";
import OffilneCourses from "./components/OffilneCourses.jsx";
import OnlineCourses from "./components/OnineCourses.jsx";
import Admin from "./Admin/admin.jsx";
import Inquiries from "./Admin/inquiries.jsx";
import Admission from "./Admin/admiision.jsx";
import Donationdetails from "./Admin/donation.jsx";

// 🔴 Layout wrapper for Navbar, Footer, and Social buttons
function Layout({ children }) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin"); 

  // Social buttons data
  const socialLinks = [
    { name: "WhatsApp", icon: <FaWhatsapp />, url: "https://wa.me/919918850293", bg: "#25D366" },
    { name: "Facebook", icon: <FaFacebookF />, url: "https://facebook.com/yourpage", bg: "#1877F2" },
    { name: "Instagram", icon: <FaInstagram />, url: "https://instagram.com/yourpage", bg: "#C13584" },
    { name: "YouTube", icon: <FaYoutube />, url: "https://youtube.com/@ddsgroupenglish?si=LYEFI0yl-DUPxYlq", bg: "#FF0000" },
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Navbar */}
      {!isAdminPage && <Navbaar />}

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      {!isAdminPage && <Footer />}

      {/* Floating social buttons (hidden on very small screens) */}
      {!isAdminPage && (
        <div className="hidden sm:flex fixed right-2 md:right-6 top-1/2 -translate-y-1/2 flex-col gap-3 md:gap-4 z-50">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex justify-center items-center w-12 h-12 md:w-14 md:h-14 rounded-full text-white shadow-lg transition-transform transform hover:scale-110"
              style={{ backgroundColor: social.bg }}
            >
              <span className="text-xl md:text-2xl">{social.icon}</span>

              {/* Tooltip */}
              <span className="absolute right-full mr-2 md:mr-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs md:text-sm font-medium bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about1" element={<About1 />} />
          <Route path="/digital" element={<Digital />} />
          <Route path="/social" element={<Social />} />
          <Route path="/seo" element={<Seo />} />
          <Route path="/content" element={<ContentWriting />} />
          <Route path="/graphic" element={<Graphic />} />
          <Route path="/videoediting" element={<VIdeoEditing />} />
          <Route path="/web" element={<Web />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/registrationform" element={<Registrationform />} />
          <Route path="/inquiryform" element={<Inquiryform />} />
          <Route path="/admissionform" element={<Admissonform />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/getintouch" element={<GetInTouch />} />
          <Route path="/offlinecourses" element={<OffilneCourses />} />
          <Route path="/OnilneCourses" element={<OnlineCourses />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/inquiries" element={<Inquiries />} />
          <Route path="/admin/admission" element={<Admission />} />
          <Route path="/admin/donationdetails" element={<Donationdetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
