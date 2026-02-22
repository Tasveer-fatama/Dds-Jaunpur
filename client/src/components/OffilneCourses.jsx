import React, { useEffect, useRef } from "react";

// Fade-up animation wrapper
const FadeInSection = ({ children }) => {
  const domRef = useRef(null);

  useEffect(() => {
    if (!domRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
          observer.unobserve(entry.target); // visible hone ke baad observer hata do
        }
      });
    });

    observer.observe(domRef.current);

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div ref={domRef} className="fade-in-section">
      {children}
    </div>
  );
};

const OffilneCourses = () => {
  const courses = [
    { title: "P.I and PI GD", desc: "Prepare for Personal Interviews and Group Discussions with practical training sessions." },
  { title: "Debate", desc: "Develop logical thinking and confidence through structured debate practice." },
  { title: "Conversation", desc: "Improve daily English speaking skills with interactive conversation exercises." },
  { title: "Anchoring", desc: "Learn professional anchoring skills for stage events and programs." },
  { title: "Marketing", desc: "Understand communication techniques used in modern marketing." },
  { title: "Public Speaking", desc: "Build confidence and fluency while speaking in front of an audience." },
  { title: "Grounding Reporting", desc: "Practice real-world reporting and presentation techniques." },
  { title: "News Reading", desc: "Enhance pronunciation and fluency through news reading practice." },
  { title: "Conference", desc: "Learn professional communication skills for conferences and meetings." },
  { title: "Seminar Articulation", desc: "Improve clarity, articulation, and presentation skills during seminars." },
  { title: "Sound Class", desc: "Master pronunciation, voice modulation, and speech clarity." },
  { title: "Singing & Speech", desc: "Enhance voice control, tone, and speech rhythm techniques." },
  { title: "Gossiping", desc: "Practice informal English conversation for daily communication." },
  { title: "Figure Talk", desc: "Improve descriptive speaking skills using pictures and visuals." },
  { title: "Word Illustration", desc: "Learn vocabulary usage through practical word explanation techniques." },
  { title: "Sentence Framing", desc: "Learn how to form correct and meaningful English sentences." },
  { title: "Stage Performance", desc: "Gain confidence and presentation skills for stage activities." },
  { title: "Podium Talk", desc: "Develop formal speaking skills for podium presentations." },
  { title: "Attacking GD", desc: "Learn smart strategies to actively participate and lead in Group Discussions." },
  { title: "Tense & Voice", desc: "Understand and practice English tenses and active/passive voice rules." },
  { title: "Auxiliary", desc: "Master the correct use of helping verbs in English sentences." },
  { title: "Preposition", desc: "Learn proper usage of prepositions in daily and formal English." },
  { title: "Article & Special Rule", desc: "Understand articles (a, an, the) and important grammar rules." },
  { title: "S.T.V.R.T.T.", desc: "Structured practice method to improve sentence formation and grammar accuracy." },
  { title: "Modern English Grammar", desc: "Study updated grammar concepts used in modern communication." },
  { title: "Traditional English Grammar", desc: "Learn foundational grammar rules for strong language basics." },
  { title: "Mock GD Interview Classes", desc: "Practice real-time mock interviews and group discussion sessions." },
  { title: "Personality Development", desc: "Enhance confidence, body language, and overall personality skills." },
  { title: "Audio Video Classes", desc: "Interactive learning sessions with audio-visual support materials." },
  { title: "Mirror Communication", desc: "Improve fluency and confidence through mirror speaking practice." },
  { title: "Individual Talks", desc: "Personalized speaking sessions to improve fluency and expression." },
  { title: "Commenting Round", desc: "Practice structured opinion sharing and commenting techniques." },
  { title: "Dialog Cutting", desc: "Learn quick response and conversation control techniques." },
  { title: "Sound Classes (U.S. & U.K.)", desc: "Learn American and British accent training for global communication." },
  { title: "Newspaper Grammar Rules", desc: "Improve grammar and vocabulary using daily newspaper reading practice." },
  { title: "Basic Computer Course", desc: "Learn computer fundamentals including MS Office, internet, and file management." },
  { title: "DCA, ADCA, PGDCA", desc: "Diploma programs covering programming, software applications, and computer fundamentals." },
  { title: "Tally & Expert Excel", desc: "Master accounting software Tally and advanced MS Excel tools." },
  { title: "Digital Marketing", desc: "Learn SEO, social media marketing, and online advertising techniques." },
  { title: "Web Designing", desc: "Design responsive websites using HTML, CSS, and modern tools." },
  { title: "Accounting", desc: "Learn computerized accounting and financial record management." },
  { title: "Marg ERP9", desc: "Get trained in Marg ERP9 software for billing and inventory management." },
  { title: "Graphic Design", desc: "Create professional designs using tools like Photoshop and CorelDRAW." },
  { title: "ADIT & C Language", desc: "Advanced Diploma in Information Technology with C programming basics." },
  { title: "C++, Java, HTML", desc: "Learn programming and web development using C++, Java, and HTML." },
  { title: "VB & Data Analysis", desc: "Learn Visual Basic programming and basic data analysis techniques." },
  { title: "Python", desc: "Learn Python programming for software development and automation." },
  { title: "Web Development", desc: "Build dynamic websites and web applications with modern technologies." },
  { title: "IT & Management", desc: "Understand IT concepts along with basic management principles." },
  { title: "DOFA & CFA", desc: "Diploma and certificate programs in financial accounting." },
  { title: "Tally Prime", desc: "Learn advanced accounting and GST billing using Tally Prime." },
  { title: "Tally ERP9", desc: "Master Tally ERP9 for professional accounting and taxation work." },
  { title: "'O' Level", desc: "Government-recognized foundational IT certification course." },
  { title: "CCC & 'A' Level", desc: "Government-certified computer courses for basic and advanced IT skills." }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-cover bg-center bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <FadeInSection>
          <div className="relative z-10 max-w-4xl px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold">
              <span className="border-l-4 border-red-500 pl-2">Offline Courses</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200">
              Join our expert-led offline courses and boost your career with practical knowledge.
            </p>
          </div>
        </FadeInSection>
      </div>

      {/* Courses Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <FadeInSection key={index}>
            <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border-t-4 border-red-600">
              <h3 className="text-xl font-bold text-red-600 mb-3">{course.title}</h3>
              <p className="text-gray-600">{course.desc}</p>
            <a
  href="/AdmissionForm"
  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition inline-block"
>
  Enroll Now
</a>

            </div>
          </FadeInSection>
        ))}
      </div>

      {/* Fade-in CSS */}
      <style>{`
        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default OffilneCourses;
