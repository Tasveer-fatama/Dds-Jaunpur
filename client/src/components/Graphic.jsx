import { motion } from "framer-motion";

export default function GraphicDesigning() {
  const services = [
    {
      title: "Logo & Branding Design",
      desc: "Unique and memorable logos along with complete brand identity that represents your business vision.",
    },
    {
      title: "Social Media Creatives",
      desc: "Engaging and visually appealing posts, banners, and ads tailored for platforms like Instagram, Facebook, and LinkedIn.",
    },
    {
      title: "Print & Marketing Materials",
      desc: "High-quality brochures, flyers, posters, business cards, and marketing materials to boost your offline presence.",
    },
    {
      title: "UI/UX Design",
      desc: "Intuitive and interactive interface designs that enhance user experience across web and mobile applications.",
    },
    {
      title: "Packaging Design",
      desc: "Attractive and impactful packaging designs that make your products stand out in the market.",
    },
    {
      title: "Motion Graphics",
      desc: "Dynamic animated visuals and explainer videos to effectively communicate your message.",
    },
  ];

  return (
    <section className="bg-white pt-20">
      {/* Top Banner */}
      <div className="bg-black text-white py-16 px-6 md:px-20 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Graphic Designing Services
        </h1>
        <p className="text-lg md:text-xl font-medium text-red-500">
          Creative, Professional & Impactful Visual Solutions with DDS
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-black">Graphic</span>{" "}
            <span className="text-red-600">Designing</span>
          </h2>
          <p className="text-gray-800 leading-relaxed">
            At <span className="font-semibold text-black">DDS Institute</span>, 
            we craft designs that inspire, connect, and engage. Our creative 
            team transforms your vision into stunning visuals that reflect 
            professionalism and creativity. 
          </p>
          <p className="mt-4 text-gray-800 leading-relaxed">
            From branding to digital marketing designs, we ensure every piece 
            of graphic content leaves a lasting impression on your audience.
          </p>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <img
            src="https://img.freepik.com/free-vector/graphic-design-software-concept-illustration_114360-7573.jpg"
            alt="DDS Graphic Designing"
            className="rounded-2xl shadow-lg border-4 border-black bg-white p-4"
          />
        </motion.div>
      </div>

      {/* Services Section */}
      <section className="relative py-16 px-6 bg-gradient-to-r from-black via-red-700 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-10">
            Our <span className="text-red-500">Graphic Designing Services</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-2xl p-6 border-l-4 border-red-600 hover:scale-105 transform transition"
              >
                <h3 className="text-xl font-semibold text-black mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-200 font-medium max-w-3xl mx-auto">
              With <span className="font-bold text-red-500">DDS Graphic Solutions</span>, 
              we don’t just design graphics—we craft experiences that inspire 
              audiences and empower brands.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
