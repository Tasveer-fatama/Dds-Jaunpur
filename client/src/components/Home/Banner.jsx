import React from 'react';

const DDSInstituteBanner = () => {
  return (
    <div className="h-auto flex items-center justify-center bg-black overflow-hidden">
      {/* Main Container */}
      <div className="relative w-full max-w-6xl mx-auto p-8">
        
        {/* Moving Text Animation (Left to Right) */}
        <div className="absolute top-10 left-0 right-0 overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee-reverse text-2xl font-bold text-white opacity-70">
            🌟 Transform Your Career • Learn with DDS Institute • Achieve Excellence •
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 text-center">
          {/* DDS Logo */}
          <div className="flex justify-center mb-4 ">
            <img
              src="/ddslogo.png"
              alt="DDS Institute Logo"
              className="w-auto h-48 object-contain"
            />
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            DDS  Group <span className="text-red-600">Of Institution</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-300 mb-8 animate-slide-in">
            Empowering Students with Skills, Knowledge, and Global Opportunities
          </p>

          {/* Call-to-Action Button */}
        <div className="flex justify-center animate-pulse">
  <a 
    href="/InquiryForm"   // yaha apna page link daal do
    className="px-8 py-3 bg-red-600 text-white font-semibold rounded-full transition duration-300 transform hover:scale-105 hover:bg-white hover:text-red-600"
  >
    Join DDS Now
  </a>
</div>

        </div>

        {/* Floating Elements (Decoration) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-8 bg-red-600 bg-opacity-10 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 6 + 3}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style>
        {`
          @keyframes marquee-reverse {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-marquee-reverse {
            display: inline-block;
            min-width: 100%;
            animation: marquee-reverse 12s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default DDSInstituteBanner;
