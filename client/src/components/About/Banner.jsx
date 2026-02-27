import React, { useEffect,useState} from "react";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const Banner = () => {
   useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const leadership = [
 {
  name: "Mr. D. P. Singh",
  role: "Director & Founder",
  image: "/directorsir1.jpeg",
  message: "At DDS Group of Institution, our aim is to provide quality education and build strong values among students. We encourage every student to learn, grow, and achieve their dreams with confidence. With dedicated teachers and a positive environment, we strive to prepare our students for a bright and successful future."
},
 {
  name: "Mr. Gurupal Singh",
  role: "CEO & Founder Member",
  image: "/Ceo.jpeg",
  message: "As the CEO and Founder Member of DDS Group of Institution, my vision is to provide quality education and a positive learning environment. We aim to inspire students to develop knowledge, confidence, and strong values so they can achieve their goals and contribute to a better future."
},
 {
  name: "Arti Singh",
  role: "Manager",
  image: "/Artimam.jpeg",
  message: "At DDS Group of Institution, we focus on creating a supportive and disciplined environment where students can learn and grow with confidence. Our goal is to guide every student toward success by encouraging dedication, teamwork, and continuous learning so they can build a bright and successful future."
}
];


  const team = [...leadership, ];

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
     <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center text-white overflow-hidden">

  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/bgvideo.mp4" type="video/mp4" />
  </video>

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>

  {/* Content */}
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
              quality education, DDS group of institution has become a preferred destination for
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
                  by offering world-class academic programs. At DDS group of institution, we strive
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
  <video autoPlay loop muted playsInline>
    <source src="/mission.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
          </div>
        </div>
      </section>

    </div>
<div className="bg-gradient-to-b from-gray-50 to-gray-100 py-24 px-6">

      {/* Heading */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
          About Our Team
        </h2>
        <p className="text-gray-500 mt-4 text-lg">
          Meet the people who guide and inspire our organization
        </p>
      </div>

      {/* Cards */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12 max-w-7xl mx-auto">

        {team.map((person, index) => (
          <div
            key={index}
            className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-500 hover:-translate-y-3"
          >

            {/* Image */}
            <div className="h-80 overflow-hidden">
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-full object-cover object-top group-hover:scale-110 transition duration-700"
              />
            </div>

            {/* Content */}
            <div className="p-8 text-center">

              <h3 className="text-2xl font-semibold text-gray-800">
                {person.name}
              </h3>

              <span className="inline-block mt-3 mb-5 px-5 py-1.5 text-sm font-medium text-white bg-red-600 rounded-full">
                {person.role}
              </span>

              <p className="text-gray-600 text-base leading-relaxed">
                {person.message}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
    </>
  )
}

export default Banner
