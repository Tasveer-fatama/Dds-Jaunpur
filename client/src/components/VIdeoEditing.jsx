import { motion } from "framer-motion";

export default function VideoEditing() {
  const services = [
    {
      title: "Promotional Videos",
      desc: "Engaging promotional videos to highlight your business, products, or services with maximum impact.",
    },
    {
      title: "YouTube Video Editing",
      desc: "Professional editing for YouTube creators including intros, transitions, effects, and optimized storytelling.",
    },
    {
      title: "Social Media Reels & Shorts",
      desc: "Eye-catching Instagram reels, TikTok videos, and YouTube shorts designed to boost engagement.",
    },
    {
      title: "Corporate Videos",
      desc: "Clean and professional corporate video editing for presentations, events, and training materials.",
    },
    {
      title: "Event Highlights",
      desc: "Memorable event highlight videos for weddings, seminars, workshops, and cultural programs.",
    },
    {
      title: "VFX & Motion Editing",
      desc: "Creative visual effects, motion graphics, and dynamic transitions for a cinematic experience.",
    },
  ];

  return (
    <section className="bg-white pt-20">
      {/* Top Banner */}
      <div className="bg-black text-white py-16 px-6 md:px-20 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Video Editing Services
        </h1>
        <p className="text-lg md:text-xl font-medium text-red-500">
          Professional, Creative & Engaging Visual Editing with DDS
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
            <span className="text-black">Video</span>{" "}
            <span className="text-red-600">Editing</span>
          </h2>
          <p className="text-gray-800 leading-relaxed">
            At <span className="font-semibold text-black">DDS Institute</span>, 
            we craft powerful video content that tells stories, captures 
            attention, and creates lasting impressions.
          </p>
          <p className="mt-4 text-gray-800 leading-relaxed">
            From short reels to professional corporate films, we make sure 
            your videos look polished, cinematic, and impactful.
          </p>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <img
            src="https://verbit.ai/wp-content/uploads/2023/12/an-impressive-looking-computer-1024x683.jpg"
            alt="DDS Video Editing"
            className="rounded-2xl shadow-lg border-4 border-black bg-white p-4"
          />
        </motion.div>
      </div>

      {/* Services Section */}
      <section className="relative py-16 px-6 bg-gradient-to-r from-black via-red-700 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-white mb-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Our <span className="text-red-500">Video Editing Services</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-xl rounded-2xl p-6 border-l-4 border-red-600 hover:scale-105 transform transition"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-black mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-200 font-medium max-w-3xl mx-auto">
              With <span className="font-bold text-red-500">DDS Video Solutions</span>, 
              we don’t just edit videos—we craft visual stories that inspire, 
              entertain, and engage audiences.
            </p>
          </motion.div>
        </div>
      </section>
    </section>
  );
}
