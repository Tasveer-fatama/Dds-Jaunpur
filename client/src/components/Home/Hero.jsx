import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Custom CSS dynamically added
    const style = document.createElement('style');
    style.textContent = `
      @keyframes blob {
        0% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }
      .animate-blob {
        animation: blob 7s infinite;
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      .animate-pulse-slow {
        animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      .animate-shimmer {
        animation: shimmer 3s infinite linear;
        background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
        background-size: 1000px 100%;
      }
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      .animation-delay-4000 {
        animation-delay: 4s;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center bg-gradient-to-b from-gray-900 to-black overflow-hidden pt-16 min-h-screen">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-48 h-48 md:w-72 md:h-72 bg-red-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 bg-red-700 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-48 h-48 md:w-72 md:h-72 bg-red-800 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 md:w-3 md:h-3 bg-red-400 rounded-full opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${6 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      {/* 3D Floating Elements */}
      <div className="hidden md:block absolute top-1/4 left-10 transform -translate-y-1/2 z-10">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-lg transform rotate-12 transition-all duration-700 hover:rotate-45 hover:scale-125 shadow-2xl animate-float">
          <div className="flex items-center justify-center h-full text-white font-bold text-xs md:text-sm">DDS</div>
        </div>
      </div>

      <div className="hidden md:block absolute top-1/3 right-10 md:right-16 transform -translate-y-1/2 z-10">
        <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-white to-gray-300 rounded-full transform -rotate-12 transition-all duration-700 hover:rotate-12 hover:scale-125 shadow-2xl animate-float animation-delay-2000">
          <div className="flex items-center justify-center h-full text-red-700 font-bold text-xs md:text-sm">EN</div>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-1/4 left-1/3 transform translate-y-1/2 z-10">
        <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-red-700 to-red-900 rounded-md transform rotate-45 transition-all duration-700 hover:-rotate-45 hover:scale-125 shadow-2xl animate-float animation-delay-4000">
          <div className="flex items-center justify-center h-full text-white font-bold text-xs">IT</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pr-8">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">Learn English</span>
                <span className="text-white block mt-2">& Computer Skills</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
                At <span className="font-semibold text-red-400">DDS Institute of Jaunpur</span>, we transform your career aspirations into reality with industry-relevant courses and expert guidance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 transition-all duration-1000 delay-300">
                <button className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg transform transition-all duration-300 hover:from-red-500 hover:to-red-600 hover:scale-105 hover:shadow-xl shadow-lg shadow-red-900/30 relative overflow-hidden group">
                  <span className="relative z-10">Explore Courses</span>
                  <div className="absolute inset-0 animate-shimmer"></div>
                </button>
                <button className="px-6 py-3 md:px-8 md:py-4 bg-transparent border-2 border-red-500 text-white font-bold rounded-lg transform transition-all duration-300 hover:bg-red-500/10 hover:scale-105 shadow-lg shadow-red-900/20">
                  Contact Us
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 mt-8 md:mt-12">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-red-400">500+</div>
                  <div className="text-gray-400 text-sm">Students Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-red-400">95%</div>
                  <div className="text-gray-400 text-sm">Placement Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-red-400">10+</div>
                  <div className="text-gray-400 text-sm">Years Experience</div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Card */}
          <div className="w-full md:w-1/2 transition-all duration-1000 delay-500">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl transform rotate-3 blur-xl opacity-30 animate-pulse-slow"></div>
              <div className="relative bg-gray-800 rounded-2xl p-6 transform transition-all duration-700 hover:rotate-0 shadow-2xl border border-gray-700 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-900/30 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-red-900/30 rounded-tr-full"></div>
                
                <div className="relative border border-red-500/30 rounded-xl p-5 bg-gradient-to-b from-gray-900 to-gray-800">
                  <h3 className="text-xl font-bold text-white mb-4 text-center">Our Featured Courses</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "English Speaking",
                      "Web Development",
                      "Data Science",
                      "Graphic Design",
                      "Digital Marketing",
                      "Networking"
                    ].map((course, index) => (
                      <div key={index} className="flex items-center transition-all duration-300 hover:translate-x-1 group">
                        <div className="w-5 h-5 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mr-2 shadow-md flex-shrink-0">
                          <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-sm group-hover:text-white">{course}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 bg-gradient-to-r from-red-900/50 to-red-800/50 p-3 rounded-lg border border-red-700/30">
                    <p className="text-red-300 text-sm flex items-center justify-center">
                      <span className="inline-block mr-2">🎯</span> 
                      100% Job Placement Assistance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;