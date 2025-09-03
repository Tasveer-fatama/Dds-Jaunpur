import { motion } from "framer-motion";

export default function ContentWriting() {
  const services = [
    {
      title: "Website Content",
      desc: "Engaging and SEO-friendly website copy that defines your brand voice and builds trust with your audience.",
    },
    {
      title: "Blog Writing",
      desc: "Informative and well-researched blog posts that attract readers, improve rankings, and establish thought leadership.",
    },
    {
      title: "Product Descriptions",
      desc: "Creative and persuasive product descriptions designed to boost conversions and highlight unique selling points.",
    },
    {
      title: "Social Media Content",
      desc: "Catchy and interactive posts that engage your audience across all major social platforms.",
    },
    {
      title: "Copywriting",
      desc: "Powerful sales copy for ads, landing pages, and campaigns to drive clicks and increase conversions.",
    },
    {
      title: "Technical Writing",
      desc: "Clear, structured, and detailed technical documentation, manuals, and guides tailored to your industry.",
    },
  ];
  return (
    <section className="bg-white pt-20">
      {/* Top Banner */}
      <div className="bg-black text-white py-16 px-6 md:px-20 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Content Writing Services
        </h1>
        <p className="text-lg md:text-xl font-medium text-red-500">
          Drive Engagement and Sales with Expert DDS Content Writing
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
            <span className="text-black">Content</span>{" "}
            <span className="text-red-600">Writing</span>
          </h2>
          <p className="text-gray-800 leading-relaxed">
            At <span className="font-semibold text-black">DDS Institute</span>, 
            we specialize in crafting powerful content that inspires, informs, 
            and converts. Our team of expert writers creates tailored strategies 
            that give your brand a strong voice in today’s competitive digital world.
          </p>
          <p className="mt-4 text-gray-800 leading-relaxed">
            From website content to blogs, product descriptions, and social media 
            posts, our content is designed to engage your target audience, 
            strengthen your authority, and drive measurable growth.
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
            src="https://contentwriters.com/blog/wp-content/uploads/content-writer.jpg"
            alt="DDS Content Writing"
            className="rounded-2xl shadow-lg border-4 border-black bg-white p-4"
          />
        </motion.div>
      </div>

      {/* Services Section */}
      <section className="relative py-16 px-6 bg-gradient-to-r from-black via-red-700 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-10">
            Our <span className="text-red-500">Content Writing Services</span>
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
              At <span className="font-bold text-red-500">DDS Content Solutions</span>, 
              we transform words into powerful tools that enhance your brand, 
              attract customers, and deliver real business results.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
