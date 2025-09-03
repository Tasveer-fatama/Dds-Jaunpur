import { motion } from "framer-motion";

export default function SEOServices() {
  const services = [
    {
      title: "Search Engine Optimization (SEO)",
      desc: "Boost your website’s ranking on Google with our advanced SEO strategies designed to drive quality traffic and generate leads.",
    },
    {
      title: "Local SEO",
      desc: "Optimize your business for local searches and Google Maps, ensuring customers near you can easily find and connect with your services.",
    },
    {
      title: "Keyword Research & Strategy",
      desc: "We identify high-value keywords that match your business goals, helping you reach your target audience effectively.",
    },
    {
      title: "On-Page & Technical SEO",
      desc: "From website speed optimization to meta tags, content structure, and mobile responsiveness—we make your site SEO-friendly.",
    },
    {
      title: "Content Marketing",
      desc: "Our content-driven SEO approach ensures your website has engaging, keyword-rich blogs and articles that attract and convert visitors.",
    },
    {
      title: "Link Building & Outreach",
      desc: "We build high-quality backlinks and establish authority through strategic outreach campaigns to strengthen your online presence.",
    },
  ];
  return (
    <section className="bg-white pt-20">
      {/* Top Banner */}
      <div className="bg-black text-white py-16 px-6 md:px-20 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          SEO Services
        </h1>
        <p className="text-lg md:text-xl font-medium text-red-500">
          Climb Search Rankings and Grow Your Business with Proven DDS SEO Strategies
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
            <span className="text-black">SEO</span>{" "}
            <span className="text-red-600">Services</span>
          </h2>
          <p className="text-gray-800 leading-relaxed">
            At <span className="font-semibold text-black">DDS Institute</span>, we help 
            businesses enhance their online presence and climb search rankings 
            with data-driven SEO strategies. From keyword research and on-page 
            optimization to link building and technical SEO, we ensure your 
            website attracts the right audience and converts visitors into 
            loyal customers.
          </p>
          <p className="mt-4 text-gray-800 leading-relaxed">
            Our <span className="text-red-600 font-medium">comprehensive SEO solutions</span> 
            include content optimization, backlink strategies, and advanced 
            analytics. We continuously track performance and adapt to algorithm 
            updates, ensuring sustainable growth. Partnering with DDS means 
            stronger visibility, higher rankings, and measurable business results.
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
            src="https://media.licdn.com/dms/image/v2/D4D12AQFG9fwycFQRHg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1712169763836?e=2147483647&v=beta&t=pfDQyGdOy8NyQYmz3V551n_eQa4oAYJykaxNBEfAnbM"
            alt="SEO Services DDS"
            className="rounded-2xl shadow-lg border-4 border-black"
          />
        </motion.div>
      </div>

       <section className="relative py-16 px-6 bg-gradient-to-r from-black via-red-700 to-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-10">
          Our <span className="text-red-500">SEO Services</span>
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
            At <span className="font-bold text-red-500">DDS SEO Solutions</span>, 
            we don’t just improve rankings—we create strategies that build your 
            brand authority, increase visibility, and deliver measurable results.
          </p>
        
        </div>
      </div>
    </section>
    </section>
  );
}
