import { motion } from "framer-motion";

export default function WebDevelopment() {
  const services = [
    {
      title: "Custom Website Development",
      desc: "We build fully customized, responsive websites tailored to your business needs and brand identity.",
    },
    {
      title: "E-Commerce Solutions",
      desc: "Robust and scalable online stores with secure payment integration, product management, and user-friendly design.",
    },
    {
      title: "Web Application Development",
      desc: "High-performance web apps with modern frameworks and technologies to streamline your business operations.",
    },
    {
      title: "UI/UX Design",
      desc: "Creative, engaging, and user-friendly designs that deliver seamless digital experiences to your customers.",
    },
    {
      title: "CMS Development",
      desc: "Flexible and scalable CMS platforms like WordPress, Joomla, or custom CMS solutions for easy content management.",
    },
    {
      title: "Website Maintenance",
      desc: "End-to-end support, including bug fixes, updates, security checks, and performance optimization.",
    },
  ];
  return (
    <section className="bg-white pt-20">
      {/* Top Banner */}
      <div className="bg-black text-white py-16 px-6 md:px-20 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Web Development Services
        </h1>
        <p className="text-lg md:text-xl font-medium text-red-500">
          Build Modern, Scalable, and Engaging Websites with DDS Web Solutions
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
            <span className="text-black">Web</span>{" "}
            <span className="text-red-600">Development</span>
          </h2>
          <p className="text-gray-800 leading-relaxed">
            At <span className="font-semibold text-black">DDS Institute</span>, 
            we deliver cutting-edge web development solutions that combine 
            creativity, technology, and functionality. Whether you need a 
            business website, an e-commerce store, or a custom web application, 
            our team ensures pixel-perfect execution and scalable performance.
          </p>
          <p className="mt-4 text-gray-800 leading-relaxed">
            We specialize in modern frameworks, responsive designs, and 
            user-friendly interfaces. Partnering with us means faster load times, 
            better performance, and a stronger digital presence.
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
            src="https://www.simplilearn.com/ice9/free_resources_article_thumb/is_web_development_good_career.jpg"
            alt="DDS Web Development"
            className="rounded-2xl shadow-lg border-4 border-black bg-white p-4"
          />
        </motion.div>
      </div>

      {/* Services Section */}
      <section className="relative py-16 px-6 bg-gradient-to-r from-black via-red-700 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-10">
            Our <span className="text-red-500">Web Development Services</span>
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
              At <span className="font-bold text-red-500">DDS Web Solutions</span>, 
              we don’t just build websites—we create digital experiences that 
              enhance your brand visibility, improve engagement, and generate results.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
