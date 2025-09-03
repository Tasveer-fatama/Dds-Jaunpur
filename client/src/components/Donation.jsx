import React, { useState } from "react";

/*
 * 3D effect styles: use Tailwind's drop-shadow-2xl, glassmorphism, and 3D card transforms.
 * For true 3D objects, use illustrations from a site like IconScout and place <img> where needed.
 */

const YOUR_UPI_ID = "yourupiid@bank"; // Change this to your UPI id

const Donation = () => {
  const [showQr, setShowQr] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", screenshot: null });
  const [screenshotPreview, setScreenshotPreview] = useState(null);

  // Handles opening QR
  const handleDonate = (e) => {
    e.preventDefault();
    setShowQr(true);
  };

  // Handles file input
  const handleFileChange = (e) => {
    const file = e.target.files;
    setForm({ ...form, screenshot: file });
    setScreenshotPreview(URL.createObjectURL(file));
  };

  // Handles form input
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit info after payment
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with backend POST/upload logic
    alert("Thank you! Your details and screenshot have been submitted.");
    setShowQr(false);
    setForm({ name: "", email: "", screenshot: null });
    setScreenshotPreview(null);
  };

  const upiLink = `upi://pay?pa=${YOUR_UPI_ID}&pn=DDsGroupDonation`;
  return (
    <div className="bg-gradient-to-br from-yellow-100 via-red-100 to-orange-50 min-h-screen pb-10">
      {/* Hero Banner with 3D/Glassmorphism effect */}
      <div
        className="relative w-full h-[340px] md:h-[440px] flex items-center justify-center bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/002/626/082/non_2x/light-red-yellow-gradient-blur-background-vector.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/50 rounded-xl blur-sm shadow-2xl" />
        <div className="relative z-10 max-w-4xl px-6 text-center drop-shadow-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="border-l-4 border-red-500 pl-3">
              DDS Social Welfare Donation Box
            </span>
          </h1>
          <p className="text-lg md:text-2xl font-semibold">
            Support DDs Group of Institutions – Empower, Educate & Uplift the
            Community
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 bg-white/70 mt-[-50px] rounded-2xl shadow-2xl backdrop-blur-[2px]">
        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">
            About DDS The Group of Institutions
          </h2>
          <p className="text-lg mb-1">
            DDs The Group of Institutions believes in{" "}
            <strong>transforming lives</strong> through education and social
            initiatives. Our mission is to eliminate educational inequality and
            bring quality learning, healthcare, and hope to every deserving
            child and family.
          </p>
          <p className="text-lg">
            With over a decade of service, we reach thousands yearly—empowering
            students with scholarships, digital classrooms, health camps, and
            vibrant community outreach[6].
          </p>
        </section>

        {/* Impact Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">How Your Donation Helps</h2>
          <ul className="list-disc pl-5 text-lg space-y-2">
            <li>
              <strong>Scholarships</strong> for underprivileged and meritorious
              students from rural and urban backgrounds.
            </li>
            <li>
              <strong>Educational materials</strong>—notebooks, uniforms,
              digital tablets, and more for classrooms in need[6].
            </li>
            <li>
              <strong>Technology access</strong> with laptops & smartboards for
              STEM/modern education[6].
            </li>
            <li>
              <strong>Healthcare outreach</strong>—annual camps, nutrition, and
              hygiene support for children.
            </li>
            <li>
              <strong>Skill-building programs</strong> and{" "}
              <strong>women’s empowerment</strong> through targeted workshops.
            </li>
            <li>
              <strong>Infrastructure improvements</strong>: safe, inclusive, and
              inspiring learning environments[5].
            </li>
            <li>
              Sponsorship of extracurricular activities—sports, arts, and STEM
              competitions.
            </li>
          </ul>
        </section>

        {/* Success Stories */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-lg">
            <div className="p-4 bg-white rounded-xl drop-shadow-xl border-l-4 border-yellow-400">
              <strong>Priya's Leap:</strong> Your donations funded Priya’s
              college education after her parents lost work. Today, she’s a
              science teacher inspiring 400+ children per year.
            </div>
            <div className="p-4 bg-white rounded-xl drop-shadow-xl border-l-4 border-red-400">
              <strong>Fit & Healthy Kids:</strong> 2024’s nutrition camps,
              powered by your support, delivered 3,100 healthy meals & dental
              checkups to children in 15 villages.
            </div>
          </div>
        </section>

        {/* Ways to Donate */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">Ways You Can Contribute</h2>
          <ul className="list-disc pl-5 text-lg">
            <li>
              <strong>One-time Donations</strong> – Any amount helps and is
              tax-deductible.
            </li>
            <li>
              <strong>Monthly Supporter</strong> – Pledge monthly for a bigger
              impact.
            </li>
            <li>
              <strong>In-kind Gifts</strong> – Donate supplies, technology, or
              professional services.
            </li>
            <li>
              <strong>Volunteer Time</strong> – Mentor youth, run workshops, or
              sponsor a child.
            </li>
          </ul>
        </section>

        {/* Donation Box UI with 3D/Glassmorphism */}
        <section>
          <h2 className="text-2xl font-bold mb-3">Contribute Now</h2>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <form className="flex-1 bg-white/90 rounded-2xl p-8 shadow-2xl border-2 border-red-100 transform hover:scale-105 transition-transform duration-300">
              <div className="mb-4 text-gray-700 text-lg">
                <strong>Join us in transforming lives!</strong>
                <p>
                  Your support helps children receive an education, provides
                  scholarships to deserving youth, and enables vital healthcare
                  & community upliftment projects. Even a small contribution can
                  have a big, lasting impact. Together, we can make sure every
                  child has the resources to dream, learn, and succeed[5][9].
                </p>
                <p className="mt-2 font-semibold text-red-600">
                  100% of your donation goes directly to educational and social
                  welfare programs. Thank you for being a part of this
                  life-changing mission!
                </p>
              </div>

              {/* Add your input fields here */}
              {/* Example: Name, Email, Donation Amount, etc. */}

              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-red-500 to-yellow-400 text-white font-bold rounded hover:from-yellow-500 hover:to-red-600 shadow-lg transition"
                onClick={handleDonate}
              >
                Donate Now
              </button>
            </form>

            <div className="flex-1 p-4 rounded-2xl bg-gradient-to-br from-yellow-100 via-white to-red-100 shadow-2xl border drop-shadow-lg text-lg">
              <h3 className="text-xl font-bold mb-2 text-red-600">
                Transparency & Trust
              </h3>
              <ul className="list-disc pl-5 mb-2">
                <li>
                  Donations are tax-exempt and acknowledged with receipts.
                </li>
                <li>Monthly donation reports are published online.</li>
                <li>
                  Every rupee is used for children’s futures and community
                  support.
                </li>
              </ul>
              <div className="my-4">
                <span className="text-green-700 font-semibold">
                  100% Secure & Private Donation
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        {/* ... other content as in your current code ... */}
        <form className="...">{/* ... existing amount/name etc ... */}</form>

        {showQr && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-lg w-full text-center relative">
              {/* <QRCode value={upiLink} size={150} /> */}
              <img
                src="/path-to-your-upi-qr.png"
                alt="UPI QR"
                className="mx-auto w-40 h-40 my-4"
              />
              <h2 className="text-xl font-bold mb-2">Scan to Pay with UPI</h2>
              <p className="mb-4 text-gray-700 font-mono break-all">
                {upiLink}
              </p>
              <div className="bg-yellow-50 p-2 mb-4 rounded-md">
                <b>Instructions:</b> Scan with any UPI app (PhonePe, GPay, etc)
                and complete the donation.
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="file"
                  name="screenshot"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2"
                  required
                />
                {screenshotPreview && (
                  <img
                    src={screenshotPreview}
                    alt="Screenshot Preview"
                    className="mx-auto w-32 my-2 border rounded"
                  />
                )}
                <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-2 px-4 rounded shadow"
                >
                  Submit Screenshot & Details
                </button>
              </form>
              <button
                onClick={() => setShowQr(false)}
                className="absolute top-2 right-4 text-xl text-gray-400 hover:text-red-500"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donation;
