import React from "react";
import { motion } from "framer-motion";

const DigitalMarketing = () => {
 const services = [
    {
      title: "Brand Building",
      desc: "We create a strong brand identity that sets you apart from the competition.",
      icon: "🏢",
    },
    {
      title: "Website Traffic",
      desc: "Drive consistent and quality traffic to your website with our proven methods.",
      icon: "🚀",
    },
    {
      title: "Lead Generation",
      desc: "Get high-quality leads that actually convert into paying customers.",
      icon: "📊",
    },
    {
      title: "Social Media Marketing",
      desc: "Engage audiences and grow your influence with smart social strategies.",
      icon: "📱",
    },
    {
      title: "Boosting Sales",
      desc: "We help you increase sales by optimizing campaigns and audience targeting.",
      icon: "💰",
    },
    {
      title: "Content Strategy",
      desc: "Effective content strategies to connect with your audience and drive results.",
      icon: "📝",
    },
    {
      title: "Going Viral",
      desc: "We design campaigns with viral potential to maximize reach and awareness.",
      icon: "🔥",
    },
    {
      title: "Reputation Management",
      desc: "Protect and enhance your brand reputation in the digital world.",
      icon: "🛡️",
    },
  ];

  return (
    <div className="w-full bg-white pt-20"> {/* pt-24 navbar ki jagah bana dega */}
      {/* Top Banner Section */}
      <div className="bg-black text-white py-12 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-5xl font-bold leading-snug"
          >
            <span className="text-red-500">BEST</span> <br />
            DIGITAL MARKETING <br />
            SERVICES IN JAUNPUR
          </motion.h1>
        </div>

        {/* Institute Logo Right Corner */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-6 right-6 text-right"
        >
          <h2 className="text-xl font-bold text-red-500">DDS INSTITUTE</h2>
          <p className="text-sm text-white">The Group of Institutions</p>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-red-600">
            Digital Marketing <span className="text-black">Services</span>
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At <span className="font-semibold">DDS Institute of Jaunpur</span>,
            we’re proud to be a leading digital marketing training and service
            provider. Our expert team designs tailored, data-backed strategies
            that grow your online presence, attract the right audience, and
            convert engagement into real results.
            <br />
            <br />
            From{" "}
            <span className="font-semibold text-red-600">
              SEO, Social Media Marketing, Paid Campaigns
            </span>{" "}
            and{" "}
            <span className="font-semibold text-red-600">Content Strategy</span>{" "}
            — we provide complete solutions designed to elevate your brand.
            <br />
            <br />
            Through performance tracking and strategic improvements, we ensure
            your campaigns stay aligned with market trends. Let us transform
            your digital presence into a consistent source of leads and revenue.
          </p>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex justify-center"
        >
          <img
            src="https://www.michaelpage.ae/sites/michaelpage.ae/files/legacy/7_digital_skills600x387.png"
            alt="Digital Marketing"
            className="rounded-lg shadow-xl w-80 border-4 border-red-500"
          />
        </motion.div>
      </div>
      <div className="bg-gradient-to-b from-gray-50 to-white text-center py-16 px-6">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
        Drive targeted traffic through strategic{" "}
        <span className="text-red-600">Digital Marketing</span>
      </h2>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Our comprehensive digital marketing services are designed to boost your online presence and drive measurable results.
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center 
                       transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
          >
            {/* Icon Container */}
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 
                            group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 text-2xl">
              {service.icon}
            </div>
            
            {/* Card Content */}
            <h3 className="font-bold text-lg mb-2 text-black group-hover:text-red-600 transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm">{service.desc}</p>
            
            {/* Hover Border Effect */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
        ))}
      </div>
        </div>
     <section className="bg-white py-16 px-6 md:px-20">
  <motion.div
    className="max-w-5xl mx-auto text-center md:text-left"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    {/* Heading */}
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
      Why Choose <span className="text-red-600">DDS Institute</span> 
      for Digital Marketing Services?
    </h2>

    {/* Subheading */}
    <h3 className="text-xl md:text-2xl font-semibold text-red-600 mb-6">
     Grow Your Business Online with Expert Strategies
    </h3>

    {/* Paragraph */}
    <p className="text-gray-700 leading-relaxed">
     At DDS Institute, we don’t just teach Digital Marketing — 
      we provide full-scale services to help your business succeed online. 
      From creating impactful campaigns to driving real conversions, 
      our expert team ensures you stand out in the competitive digital world.
    </p>
  </motion.div>
</section>
    </div>
  );
};

export default DigitalMarketing;
