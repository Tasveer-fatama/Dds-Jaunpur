import React, { useEffect, useRef } from "react";

// Fade-up animation wrapper
const FadeInSection = ({ children }) => {
  const domRef = useRef(null);

  useEffect(() => {
    if (!domRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
          observer.unobserve(entry.target); // visible hone ke baad observer hata do
        }
      });
    });

    observer.observe(domRef.current);

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div ref={domRef} className="fade-in-section">
      {children}
    </div>
  );
};

const OffilneCourses = () => {
  const courses = [
    { title: "AutoCAD", desc: "Learn professional AutoCAD skills for design & drafting." },
    { title: "PDCA", desc: "Practical Diploma in Computer Application with industry tools." },
    { title: "ADCA + CCC", desc: "Advance Diploma with Computer Concepts certification." },
    { title: "DCA", desc: "Diploma in Computer Application for beginners." },
    { title: "Tally + GST", desc: "Master accounting with Tally ERP and GST modules." },
    { title: "Typing (Eng & Hindi)", desc: "Boost typing speed in English and Hindi." },
    { title: "M. Olevel", desc: "Master O-Level certification with practical knowledge." },

    { title: "Digital Marketing", desc: "Learn SEO, Social Media, Ads & Content Marketing." },
    { title: "MERN Stack", desc: "Full stack web development using MongoDB, Express, React & Node.js." },
    { title: "HTML & CSS", desc: "Core web design skills for building responsive websites." },
    { title: "JavaScript", desc: "Master the most popular language for dynamic websites." },
    { title: "Java", desc: "Strong foundation for OOP and enterprise-level applications." },
    { title: "Python", desc: "Learn Python for web, data science, AI, and automation." },
    { title: "C", desc: "Understand programming fundamentals and memory management." },
    { title: "C++", desc: "Master OOP concepts and system-level programming." },

    { title: "Spoken English", desc: "Improve fluency, pronunciation, and communication skills." },
    { title: "Grammar Classes", desc: "Learn English grammar rules in depth with practical exercises." },
    { title: "Interview Training", desc: "Boost confidence and communication for job interviews." },
    { title: "GD & PI Classes", desc: "Group Discussion & Personal Interview practice sessions." },
    { title: "Sound Classes (U.S. & U.K.)", desc: "Learn accent training for global communication." },
    { title: "Newspaper Grammar Rules", desc: "Enhance grammar & vocabulary using daily newspapers." },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-cover bg-center bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <FadeInSection>
          <div className="relative z-10 max-w-4xl px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold">
              <span className="border-l-4 border-red-500 pl-2">Offline Courses</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200">
              Join our expert-led offline courses and boost your career with practical knowledge.
            </p>
          </div>
        </FadeInSection>
      </div>

      {/* Courses Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <FadeInSection key={index}>
            <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border-t-4 border-red-600">
              <h3 className="text-xl font-bold text-red-600 mb-3">{course.title}</h3>
              <p className="text-gray-600">{course.desc}</p>
              <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition">
                Enroll Now
              </button>
            </div>
          </FadeInSection>
        ))}
      </div>

      {/* Fade-in CSS */}
      <style>{`
        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default OffilneCourses;
