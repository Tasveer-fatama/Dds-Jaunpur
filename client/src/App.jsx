import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbaar from "./Navbaar.jsx";
import Footer from "./Footer.jsx";

import Home from "./components/Home/Home.jsx";
import About1 from "./components/About/About1.jsx";
// Future ke liye aur pages bhi yaha import kar sakte ho
// import Courses from "./components/Courses/Courses.jsx";

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
          {/* <Route path="/courses" element={<Courses />} /> */}
        </Routes>
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </Router>
  );
}

export default App;
