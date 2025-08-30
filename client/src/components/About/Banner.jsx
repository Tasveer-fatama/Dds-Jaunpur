import React, { useEffect } from "react";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {


 

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (_, next) => setActiveIndex(next),
    customPaging: () => (
      <div
        className="w-10 h-3 m-4 space-x-4 bg-yellow-600 cursor-pointer"
        style={{ border: "3px solid #fff" }}
      ></div>
    ),
    dotsClass: "slick-dots custom-dots",
  };


  return (
    <>
    <div>
        {/* Banner Section */}
      <div
        className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/002/626/082/non_2x/light-red-yellow-gradient-blur-background-vector.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            <span className="border-l-4 border-red-500 pl-2">About DDS</span>
          </h1>
        </div>
      </div>
    </div>
     <div>
   

      {/* Introduction */}
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div
            className="max-w-screen-lg text-black sm:text-lg"
            data-aos="fade-up"
          >
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-black">
              Empowering Education, Building Futures
            </h2>
            <p className="mb-4 font-light">
              Established with a vision to transform education,{" "}
              <span className="font-semibold text-red-600">
                DDS The Group of Institutions
              </span>{" "}
              has emerged as a trusted hub for academic excellence and
              innovation. With a commitment to nurturing talent and providing
              quality education, DDS has become a preferred destination for
              students seeking holistic growth. Our programs are designed to
              blend knowledge with practical skills, preparing students for the
              challenges of the modern world.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-14 lg:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
            <div
              className="img-box"
              data-aos="fade-right"
            >
              <img
                src="https://media.istockphoto.com/id/2012393906/photo/big-data-analysis-with-ai-technology-person-using-machine-learning-and-deep-learning-neural.jpg?s=612x612&w=0&k=20&c=x6GEnjoq6PJR8f5VdlIIGfCuJMEXO4AZZUcbgJC9_HU="
                alt="Vision DDS"
                className="max-lg:mx-auto object-cover rounded-lg"
              />
            </div>
            <div
              className="lg:pl-[100px] flex items-center"
              data-aos="fade-left"
            >
              <div className="data w-full">
                <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center relative">
                  Our Vision
                </h2>
                <p className="font-normal text-xl leading-8 text-gray-600 max-lg:text-center max-w-2xl mx-auto">
                  To empower students with knowledge, creativity, and confidence
                  by offering world-class academic programs. At DDS, we strive
                  to create leaders who are not only professionally skilled but
                  also socially responsible, ethical, and compassionate human
                  beings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-14 lg:py-24 relative bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9">
            <div
              className="lg:pr-24 flex items-center"
              data-aos="fade-right"
            >
              <div className="data w-full">
                <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center">
                  Our Mission
                </h2>
                <p className="font-normal text-xl leading-8 text-gray-600 max-lg:text-center max-w-2xl mx-auto">
                  To provide innovative, practical, and affordable education
                  through both{" "}
                  <span className="text-red-600 font-semibold">
                    offline
                  </span>{" "}
                  and{" "}
                  <span className="text-red-600 font-semibold">
                    online courses
                  </span>
                  . We aim to bridge the gap between academic learning and
                  industry requirements by fostering an environment of research,
                  creativity, and continuous learning.
                </p>
              </div>
            </div>
            <div
              className="img-box"
              data-aos="fade-left"
            >
              <img
                src="https://img.freepik.com/premium-photo/man-touching-mission-text-screen_218381-4228.jpg?semt=ais_hybrid&w=740&q=80"
                alt="DDS Mission"
                className="hidden lg:block object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>

  
    </>
  )
}

export default Banner
