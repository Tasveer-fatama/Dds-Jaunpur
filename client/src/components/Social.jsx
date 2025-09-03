import { motion } from "framer-motion";

export default function SocialMediaMarketing() {
  return (
    <section className="bg-white pt-20">
      {/* Top Banner */}
      <div className="bg-black text-white py-16 px-6 md:px-20 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Social Media Marketing
        </h1>
        <p className="text-lg md:text-xl font-medium text-gray-300">
          Accelerate Business Growth with Results-Driven Digital Marketing Solutions
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
            <span className="text-black">Social Media</span>{" "}
            <span className="text-red-600">Marketing</span>
          </h2>
          <p className="text-gray-800 leading-relaxed">
            At <span className="font-semibold text-black">DDS Institute</span>, we help 
            businesses amplify their presence through innovative social media 
            marketing strategies. Our expert team crafts engaging content, 
            data-driven campaigns, and creative ad solutions to connect you 
            with the right audience and convert followers into loyal customers.
          </p>
          <p className="mt-4 text-gray-800 leading-relaxed">
            From <span className="text-red-600 font-medium">content creation</span> 
            and <span className="text-red-600 font-medium">community engagement</span> 
            to <span className="text-red-600 font-medium">targeted ad campaigns</span>, 
            we deliver end-to-end solutions that ensure your brand stands out. 
            With continuous performance analysis and trend adaptation, DDS ensures 
            your campaigns drive consistent growth and strong ROI.
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
            src="https://www.digitalsocialite.in/wp-content/uploads/2025/02/social-media-marketing-services.jpg"
            alt="Social Media Marketing DDS"
            className="rounded-2xl shadow-lg border-4 border-black"
          />
        </motion.div>
      </div>
    </section>
  );
}
