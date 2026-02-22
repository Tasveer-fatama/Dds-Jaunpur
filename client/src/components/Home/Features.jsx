import React, { useEffect, useMemo, useState } from "react";
import {
  FaLightbulb,
  FaChartLine,
  FaDesktop,
  FaGraduationCap,
  FaCogs,
  FaGlobe,
} from "react-icons/fa";

const features = [
  {
    title: "Spoken English & Personality Development",
    icon: <FaLightbulb className="w-10 h-10 text-red-600" />,
    description:
      "Boost your confidence with English communication, public speaking, and personality development training.",
  },
  {
    title: "Computer Training Programs",
    icon: <FaDesktop className="w-10 h-10 text-red-600" />,
    description:
      "Industry & Govt.-certified courses: O Level, ADCA, CCC, Tally, Java, Python & more.",
  },
  {
    title: "20+ Years of Excellence",
    icon: <FaGraduationCap className="w-10 h-10 text-red-600" />,
    description:
      "DDS Group of Institution has been transforming students’ futures with quality education for over 20 years.",
  },
  {
    title: "Career-Focused Training",
    icon: <FaChartLine className="w-10 h-10 text-red-600" />,
    description:
      "Get job-oriented skills and practical knowledge for real-world success.",
  },
  {
    title: "Govt. Recognized Certification",
    icon: <FaCogs className="w-10 h-10 text-red-600" />,
    description:
      "All programs are certified and recognized, giving you an edge in jobs & higher studies.",
  },
  {
    title: "Global Learning Standards",
    icon: <FaGlobe className="w-10 h-10 text-red-600" />,
    description:
      "Our teaching methods are aligned with global standards for holistic development.",
  },
];

const images = [
  "https://scontent.fvns6-1.fna.fbcdn.net/v/t39.30808-6/514870300_10085353011571454_2746977730487872243_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=G9XGN7mQPisQ7kNvwEQyJlk&_nc_oc=AdmFweXGd6glmpeVM0Jg8IL4Gg_y7ziulUit1uGXRyDj07XCIQt5snBGMWXX6ehuFQtHeFRhKI_C30jeVpMuGMgA&_nc_zt=23&_nc_ht=scontent.fvns6-1.fna&_nc_gid=GeWSuIL_ODHlVHALmvZNPw&oh=00_Afo5GKYsYqvJIZAqhp5b8Pw50abrnIxasn2XzHFggHPaaw&oe=69791269",
  "https://scontent.fvns6-2.fna.fbcdn.net/v/t39.30808-6/514351514_10085192241587531_8262594962582342216_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=CKvN9Ggzj20Q7kNvwGHBDyc&_nc_oc=AdnFb8LlMHdtfPNaDFszibTNHN98CD9MYLwbMk7norN_tlWeF3TE_o0tNKIswpVH7t_McteSVErCIo39IBmWK314&_nc_zt=23&_nc_ht=scontent.fvns6-2.fna&_nc_gid=yiiIW-SR_u0-YrIXrI2oxw&oh=00_AfpPKCW0stF_4xGPXiyKyEgvS7ZU4cg-v9q9iH_R0pE0Uw&oe=697916D7",
  "https://scontent.fvns6-1.fna.fbcdn.net/v/t39.30808-6/490943449_9514857385287689_7149053228765739684_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=jECyKZN8kdwQ7kNvwE7uC8j&_nc_oc=AdmIvpa-KfHjr445BWk551mGDTg3h-zaEHs_RJfoWjXbJsGZLgv5BvMzmv_s9fhEr2mQgO4nRl5wOUBbaaO-0C0c&_nc_zt=23&_nc_ht=scontent.fvns6-1.fna&_nc_gid=xp0ZcNi5nhwvZu0bFsrhbw&oh=00_AfosEh4GuxdIfn0_XHsasZ8c0NOr5R244_noUbVLedBgaQ&oe=6978F7BC",
];

const DDSFeatures = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // ✅ Put your exact logo here (same, no change)
  const logoUrl = "/ddslogo.png"; // keep in public folder

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ✅ background logo pattern (repeat)
  const logoPatternStyle = useMemo(
    () => ({
      backgroundImage: `url(${logoUrl})`,
      backgroundRepeat: "repeat",
      backgroundSize: "140px 140px", // logo size (small small)
      backgroundPosition: "center",
      opacity: 0.14, // pattern visibility
    }),
    [logoUrl]
  );

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden py-16 px-6">
      {/* LEFT RED SECTION */}
      <div className="absolute left-0 top-0 h-full w-full md:w-1/3 bg-gradient-to-b from-red-600 to-red-700">
        {/* ✅ DDS LOGO PATTERN OVERLAY */}
        <div className="absolute inset-0" style={logoPatternStyle} />

        {/* ✅ Soft dark overlay so pattern looks premium */}
        <div className="absolute inset-0 bg-black/15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-3 gap-12 items-center">
        {/* IMAGE SLIDER - FULL WIDTH LEFT SIDE */}
        <div className="relative md:col-span-1 w-full">
          <div className="relative w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="DDS Students"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                  index === currentImage
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-110"
                }`}
              />
            ))}

            {/* ✅ Small red glow overlay for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="md:col-span-2 bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-red-100">
          <h2 className="text-3xl md:text-5xl font-extrabold text-red-600 mb-4">
            DDS Group of Institution
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            At{" "}
            <span className="font-bold text-red-600">
              DDS Group of Institution
            </span>
            , we empower students with
            <span className="font-semibold text-red-600">
              {" "}
              English Communication
            </span>
            ,
            <span className="font-semibold text-red-600">
              {" "}
              Computer Education
            </span>
            , and career-focused training. With{" "}
            <strong>20+ years of excellence</strong>, DDS ensures global exposure
            and recognized certifications.
          </p>

          {/* FEATURES */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white border border-red-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DECORATIVE CIRCLES */}
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-red-600/20 rounded-full translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-10 right-20 w-20 h-20 bg-red-600/20 rounded-full" />
    </section>
  );
};

export default DDSFeatures;
