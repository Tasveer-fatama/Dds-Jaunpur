import React from "react";

const Companies = () => {
  return (
    <div className="bg-white py-16">
      <section className="container max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-start border-l-8 border-red-600 pl-4">
          <h2 className="text-4xl font-bold text-black sm:text-5xl uppercase">
            DDS The Group of Institution
          </h2>
          <p className="mt-4 text-lg text-gray-800 max-w-4xl">
            DDS The Group of Institution, Jaunpur – a trusted name for{" "}
            <span className="font-semibold text-black">
              English Communication
            </span>{" "}
            and{" "}
            <span className="font-semibold text-black">
              Computer Education
            </span>
            . With{" "}
            <span className="text-red-600 font-bold">15+ years of excellence</span>, 
            we empower students with practical knowledge and career-focused skills.
          </p>
        </div>

        {/* Content Grid */}
        <div className="mt-16 grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Left Side Content */}
          <div className="space-y-8">
            {/* Spoken English */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-14 h-14 rounded-md bg-red-600 text-white font-bold text-lg shadow-lg">
                  EN
                </div>
              </div>
              <div className="ml-6">
                <h4 className="text-xl font-semibold text-black">
                  Spoken English & Personality Development
                </h4>
                <p className="mt-2 text-gray-700">
                  Master English speaking, communication skills, and personality
                  development to boost your confidence.
                </p>
              </div>
            </div>

            {/* Computer Courses */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-14 h-14 rounded-md bg-black text-white font-bold text-lg shadow-lg">
                  IT
                </div>
              </div>
              <div className="ml-6">
                <h4 className="text-xl font-semibold text-black">
                  Computer Training Programs
                </h4>
                <p className="mt-2 text-gray-700">
                  Govt.-certified courses:{" "}
                  <strong className="text-red-600">
                    O Level, ADCA, CCC, Tally, Java, Python
                  </strong>{" "}
                  & more.
                </p>
              </div>
            </div>

            {/* Govt. Certification */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-14 h-14 rounded-md bg-red-600 text-white font-bold text-lg shadow-lg">
                  ✔
                </div>
              </div>
              <div className="ml-6">
                <h4 className="text-xl font-semibold text-black">
                  Govt. Recognized Certification
                </h4>
                <p className="mt-2 text-gray-700">
                  All programs are certified and recognized, giving you an edge
                  in jobs & higher studies.
                </p>
              </div>
            </div>

            {/* Career Growth */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-14 h-14 rounded-md bg-black text-white font-bold text-lg shadow-lg">
                  🚀
                </div>
              </div>
              <div className="ml-6">
                <h4 className="text-xl font-semibold text-black">
                  Career-Focused Training
                </h4>
                <p className="mt-2 text-gray-700">
                  From beginners to advanced learners, DDS ensures every student
                  gets the right guidance and industry-level training.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="mt-10 lg:mt-0 flex justify-center">
            <img
              src="/about.png"// public folder me image ka path
              alt="DDS Group"
              className="rounded-xl shadow-xl border-4 border-red-600 w-full max-w-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Companies;
