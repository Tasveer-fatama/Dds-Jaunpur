import React, { useEffect,useState} from "react";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const Banner = () => {
   useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const messages = [
    {
      title: "Message from the Director",
      name: "Mr. Rakesh Sharma",
      role: "Director, DDS Group of Institution",
      img: "/Director.jpeg",
      content: `At DDS Group of Institution, we believe in empowering students with 
      knowledge and practical skills that prepare them for the future. 
      Our mission is to provide quality education in English and Computer studies.`,
    },
    {
      title: "Message from the CEO",
      name: "Ms. Priya Verma",
      role: "CEO, DDS Institution",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      content: `Education is not just about academics, it is about building confidence, 
      values, and lifelong learning habits. At DDS Institution, our vision is 
      to create a platform where students gain the right balance of theory and practice.`,
    },
    {
      title: "Message from the Manager",
      name: "Mr. Anil Singh",
      role: "Manager, DDS Institution",
      img: "https://randomuser.me/api/portraits/men/65.jpg",
      content: `We at DDS Institution focus on a student-centric approach. 
      Every learner is unique, and our responsibility is to guide them with 
      personalized attention, structured learning modules, and real-world exposure.`,
    },
  ];
 

 const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
    
    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1 });
    
    // Observe all elements with fade-up class
    const fadeElements = document.querySelectorAll(".fade-up");
    fadeElements.forEach((el) => observer.observe(el));
    
    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
 

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
        className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-cover bg-center text-white bg-black"
      
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
                DDS Group of Institution
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
  <div className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto space-y-8 px-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center"
            data-aos={index % 2 === 0 ? "fade-up" : "fade-in"}
          >
            {/* Text Section */}
            <div className="md:w-2/3">
              <h2 className="text-xl font-bold text-gray-900">{msg.title}</h2>
              <p className="text-gray-700 mt-4">{msg.content}</p>
              <p className="text-gray-900 font-semibold mt-6">With warm regards,</p>
              <p className="font-bold text-gray-900">{msg.name}</p>
              <p className="font-semibold text-gray-700">{msg.role}</p>
            </div>

            {/* Image Section */}
            <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
              <div className="text-center">
                <img
                  src={msg.img}
                  alt={msg.name}
                  className="rounded-full w-40 h-40 object-cover border-4 border-blue-500"
                />
                <p className="font-bold text-gray-900 mt-2">{msg.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  
    </>
  )
}

export default Banner
