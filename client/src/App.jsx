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
// 🔴 Wrapper for Navbar/Footer condition
function Layout({ children }) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin"); 

   // Social buttons data
  const socialLinks = [
    { icon: <FaWhatsapp />, url: "https://wa.me/919918850293", bg: "#25D366" },
    { icon: <FaFacebookF />, url: "https://facebook.com/yourpage", bg: "#1877F2" },
    { icon: <FaInstagram />, url: "https://instagram.com/yourpage", bg: "#C13584" },
    { icon: <FaYoutube />, url: "https://youtube.com/@ddsgroupenglish?si=LYEFI0yl-DUPxYlq", bg: "#FF0000" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 🟢 Normal pages ke liye Navbar & Footer */}
      {!isAdminPage && <Navbaar />}

      <main className="flex-grow">{children}</main>

      {!isAdminPage && <Footer />}

          {/* 🟢 Social floating buttons */}
       {/* 🟢 Social floating buttons on the right */}
  
{/* 🟢 Social floating buttons on the right - Enhanced */}
{!isAdminPage && (
  <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 animate-fade-in-right">
    {socialLinks.map((social, index) => (
      <div 
        key={index} 
        className="relative group"
        style={{ 
          animationDelay: `${index * 100}ms` 
        }}
      >
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900/90 backdrop-blur-sm text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 pointer-events-none shadow-xl border border-gray-700">
          {social.name}
          <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-l-[6px] border-transparent border-l-gray-900/90"></div>
        </div>

        {/* Social Button */}
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden group/btn"
          style={{
            backgroundColor: social.bg,
            color: "white",
            padding: "14px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "22px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)",
            transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            willChange: "transform",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.15) translateY(-2px)";
            e.currentTarget.style.boxShadow = `0 15px 30px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.2)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)";
          }}
        >
          {/* Pulse Effect */}
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-0 group-hover/btn:opacity-100" 
               style={{ animationDuration: '2s' }}></div>
          
          {/* Shine Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-full group-hover/btn:translate-x-[-100%] transition-transform duration-700"></div>
          
          {/* Icon */}
          <span className="relative z-10 transition-transform duration-300 group-hover/btn:scale-110">
            {social.icon}
          </span>
        </a>
      </div>
    ))}
    
    {/* Connecting Line (Optional) */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[calc(100%-20px)] bg-gradient-to-b from-transparent via-gray-500/30 to-transparent -z-10"></div>
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
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/inquiries" element={<Inquiries/>} />
          <Route path="/admin/admission" element={<Admission />} />
          <Route path="/admin/donationdetails" element={<Donationdetails/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
