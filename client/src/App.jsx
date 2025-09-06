import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

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

  return (
    <div className="flex flex-col min-h-screen">
      {/* 🟢 Normal pages ke liye Navbar & Footer */}
      {!isAdminPage && <Navbaar />}

      <main className="flex-grow">{children}</main>

      {!isAdminPage && <Footer />}
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
          <Route path="//inquiries" element={<Inquiries/>} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/donationdetails" element={<Donationdetails/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
