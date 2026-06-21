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
  "https://scontent.fknu1-1.fna.fbcdn.net/v/t39.30808-6/608174628_25393881446958695_8133908975299151123_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1365&ctp=s2048x1365&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=6oEBMlVGRfAQ7kNvwHZwdCp&_nc_oc=AdrleQf9tyVYG4dNTlnfLh4fa8s2Ves-K44fBK5DEcv7B_AEqiNSZFrqQswRiOJ252guvXmEPmlZ63z2XsPG66y0&_nc_zt=23&_nc_ht=scontent.fknu1-1.fna&_nc_gid=MoPKM4CKWusWf23a5IpwCA&_nc_ss=7b2a8&oh=00_Af85qgQNn0SaOFnv93b3Dqrxo2ypaWR0nlMRyg8UOcTCaA&oe=6A3E02ED",
  "https://scontent.fknu1-3.fna.fbcdn.net/v/t39.30808-6/514487552_10085345571572198_2885972596612341104_n.jpg?stp=dst-jpg_tt6&cstp=mx1040x780&ctp=s1040x780&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=6dau9cwtNTgQ7kNvwH3CZfa&_nc_oc=AdphbKc47FAAVmmtCVeZLmAOzETkTQp723NDL7x83Zp4uRIF6wdzlHiV9CTwRaeSTrvEbkh1s-qYVGFhrX4IUMqU&_nc_zt=23&_nc_ht=scontent.fknu1-3.fna&_nc_gid=3GSXGZcKsClpVZXwrITUrA&_nc_ss=7b2a8&oh=00_Af-IODelmNjAy-XNF7GA1t0Ocg6TnYQCEMs2J1w3vp1HAw&oe=6A3E33CD",
  "https://scontent.fknu1-1.fna.fbcdn.net/v/t39.30808-6/492049385_9507104106063017_4373625867834266036_n.jpg?stp=dst-jpg_tt6&cstp=mx1156x650&ctp=s1156x650&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=YsMU-zHwpxEQ7kNvwHm60e0&_nc_oc=AdoDcUQ90cbgMEmgBhiz3oJ4aS7jmm_fBvEuPzco8pnBQqmr70V8HAM2aoGUS9LlC1OlVnI9stNhVNbYNZbB044x&_nc_zt=23&_nc_ht=scontent.fknu1-1.fna&_nc_gid=lChP8wIhjAHZMpYyGW5a2w&_nc_ss=7b2a8&oh=00_Af-L7pqff-XsJj57419VlK8nwHEehbm8w096EE7_esxFtw&oe=6A3E03DC"
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
