import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbaar from "./Navbaar.jsx";
import Footer from "./Footer.jsx";

import Home from "./components/Home/Home.jsx";
import About1 from "./components/About/About1.jsx";
import Digital from "./components/digital.jsx"
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
import OnineCourses from "./components/OnineCourses.jsx";
function App() {
  return (
    <Router>
      {/* Navbar always on top */}
      <Navbaar />

      {/* Routes */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about1"element={<About1 />} />
          <Route path="/digital"element={<Digital/>} />
          <Route path="/Social"element={<Social/>} />
         <Route path="/Seo"element={<Seo/>} />
        <Route path="/Content"element={<ContentWriting/>} />
l          <Route path="/Graphic"element={<Graphic/>} />
          <Route path="/videoediting"element={<VIdeoEditing/>} />
             <Route path="/Web"element={<Web/>} />
               <Route path="/Donation"element={<Donation/>} />
                 <Route path="/RegistrationForm"element={<Registrationform/>} />
                   <Route path="/InquiryForm"element={<Inquiryform/>} />
                     <Route path="/AdmissionForm"element={<Admissonform/>} />  
                       <Route path="/Videos"element={<Videos/>} />
                         <Route path="/Photos"element={<Photos/>} />
                              <Route path="/GetInTouch"element={<GetInTouch/>} />
                                 <Route path="/OfflineCourses"element={<OffilneCourses/>} />
                                    <Route path="/OnilneCourses"element={<OnineCourses/>} />
        </Routes>
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </Router>
  );
}

export default App;
