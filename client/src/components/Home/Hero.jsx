import React, { useEffect, useRef, useState } from "react";
import ddsLogo from "/ddslogo.png"; // 👈 path adjust 

const HeroSection = () => {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleResize = () => {
      if (window.innerWidth < 768 && heroRef.current) {
        heroRef.current.style.paddingTop = "70px";
      } else if (heroRef.current) {
        heroRef.current.style.paddingTop = "0px";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes float {
        0%,100% { transform: translateY(0); }
        50% { transform: translateY(-14px); }
      }
      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .animate-float { animation: float 8s ease-in-out infinite; }
      .animate-gradient {
        background-size: 400% 400%;
        animation: gradientMove 12s ease infinite;
      }
      .text-glow {
        text-shadow: 0 0 22px rgba(239,68,68,.35);
      }
      .glass-hover:hover {
        box-shadow: 0 20px 45px rgba(239,68,68,.18);
        backdrop-filter: blur(14px);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-br from-white via-red-50 to-white"
    >
      {/* 🔴 DDS Watermark Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.040]"
        style={{
          backgroundImage: `url(${ddsLogo})`,
          backgroundRepeat: "repeat",
          backgroundSize: "120px 120px",
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-100/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 md:py-20">
        {/* HERO CONTENT */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="font-extrabold leading-tight text-3xl sm:text-4xl md:text-6xl xl:text-7xl mb-6">
            <span className="block text-gray-900">Master</span>
            <span className="block bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent text-glow">
              English & Computer Skills
            </span>
          </h1>

          <p className="max-w-3xl text-gray-700 text-sm sm:text-base md:text-xl mb-8 bg-white/70 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-red-100 shadow-sm">
            Transform your career with{" "}
            <span className="font-bold text-red-700">
              D.D.S. Institute, Jaunpur
            </span>
            . Industry-ready courses, expert faculty & placement assistance.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href="/OfflineCourses"
              className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              🚀 Explore Courses
            </a>
            <a
              href="/InquiryForm"
              className="px-8 py-4 rounded-xl font-bold border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
            >
              🎯 Free Consultation
            </a>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
            {[
              { label: "Students", value: "1,00,000+", icon: "🎓" },
              { label: "Placement", value: "95%", icon: "⭐" },
              { label: "Years Experience", value: "15+", icon: "🏆" },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-hover bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-red-100 flex items-center gap-4 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-white flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {item.value}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COURSES CARD */}
        <div className="mt-16 grid lg:grid-cols-2 gap-10 items-start">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border-2 border-red-200 shadow-xl">
            <h3 className="text-2xl font-bold text-center mb-6">
              Launch Your{" "}
              <span className="text-red-600">Dream Career</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "English Speaking",
                "Web Development",
                "Graphic Design",
                "ADCA",
                "Tally ERP",
                "Digital Marketing",
              ].map((c, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-red-50 border border-red-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="font-bold text-gray-800">{c}</div>
                  <div className="text-xs text-gray-600">
                    Industry Focused
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl p-4 text-white text-center bg-gradient-to-r from-red-600 to-red-700 animate-gradient">
              100% Placement Assistance • Industry Tie-ups
            </div>
          </div>

          {/* TRUST */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              "Govt Certified",
              "ISO Certified",
              "Expert Faculty",
              "Modern Labs",
              "Flexible Timing",
              "Career Support",
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-md p-4 rounded-xl border border-red-100 text-center hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-red-600 font-bold mb-1">✔</div>
                <div className="text-xs font-semibold text-gray-800">
                  {t}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
