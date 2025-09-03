import React from "react";

const VideoWall = () => {
  const videos = [
    "https://www.youtube.com/embed/5pSAr_C8BoI?si=8ZniA8BNRm7q16vX",
    "https://www.youtube.com/embed/8SVDw5zM3Kc?si=NmqP5a1bHlgbA2hw",
    "https://www.youtube.com/embed/Tzj-DcEWj0Y?si=anqUiw192FAVUB-e",
    "https://www.youtube.com/embed/sMLXuKI9Dt8?si=vYkNEKZ2cXDDnZa9",
    "https://www.youtube.com/embed/W01Mby7b6Ps?si=cYch9-BiMY2ea3u7",
    "https://www.youtube.com/embed/Y2mCK4ffb_Q?si=KkC3Bl-G425gy6Bd",
    "https://www.youtube.com/embed/Qx2sMlhYhyQ?si=ax6l3xkca3Sop3UT",
    "https://www.youtube.com/embed/Qx2sMlhYhyQ?si=5JGQ9yed_1Bq63kp",
  ];

  return (
    <div className="bg-gray-50 py-12">
     <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            <span className="border-l-4 border-red-500 pl-2">
              Our videos
            </span>
          </h1>
        </div>
      </div>

      {/* Responsive Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {videos.map((video, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-110 hover:shadow-2xl cursor-pointer"
          >
            <iframe
              className="w-full h-48 md:h-56"
              src={video}
              title={`Video ${i}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoWall;
