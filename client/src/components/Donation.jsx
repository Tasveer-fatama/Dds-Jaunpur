import React, { useState } from "react";
import axios from "axios";

const YOUR_UPI_ID = "yourupiid@bank"; // Apna UPI ID yaha daalna

const Donation = () => {
  const [showQr, setShowQr] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", screenshot: null });
  const [screenshotPreview, setScreenshotPreview] = useState(null);

  // ✅ Input change
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ File change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, screenshot: file });
    if (file) {
      setScreenshotPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Donate Button
  const handleDonate = (e) => {
    e.preventDefault();
    setShowQr(true);
  };

  // ✅ Form Submit (connect with backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("screenshot", form.screenshot);

      const res = await axios.post("http://localhost:5000/api/donation", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message || "Thank you! Your details and screenshot have been submitted.");
      setShowQr(false);
      setForm({ name: "", email: "", screenshot: null });
      setScreenshotPreview(null);
    } catch (err) {
      console.error(err);
      alert("Error submitting donation details.");
    }
  };

  const upiLink = `upi://pay?pa=${YOUR_UPI_ID}&pn=DDsGroupDonation`;

  return (
    <div className="bg-gradient-to-br from-yellow-100 via-red-100 to-orange-50 min-h-screen pb-10">
      {/* Hero Banner */}
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

      {/* Main Section */}
      <div className="max-w-4xl mx-auto px-6 py-10 bg-white/70 mt-[-50px] rounded-2xl shadow-2xl backdrop-blur-[2px]">
        {/* Donation Form Card */}
        <section>
          <h2 className="text-2xl font-bold mb-3">Contribute Now</h2>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <form
              onSubmit={handleDonate}
              className="flex-1 bg-white/90 rounded-2xl p-8 shadow-2xl border-2 border-red-100"
            >
              <p className="text-lg mb-4">
                Your support helps children receive an education, provides
                scholarships, and enables vital healthcare & community upliftment
                projects. Even a small contribution can have a big, lasting
                impact. ❤️
              </p>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-red-500 to-yellow-400 text-white font-bold rounded hover:from-yellow-500 hover:to-red-600 shadow-lg transition"
              >
                Donate Now
              </button>
            </form>

            <div className="flex-1 p-4 rounded-2xl bg-gradient-to-br from-yellow-100 via-white to-red-100 shadow-2xl border text-lg">
              <h3 className="text-xl font-bold mb-2 text-red-600">
                Transparency & Trust
              </h3>
              <ul className="list-disc pl-5 mb-2">
                <li>Donations are tax-exempt and acknowledged with receipts.</li>
                <li>Monthly donation reports are published online.</li>
                <li>Every rupee is used for children’s futures.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Popup Modal */}
      {showQr && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-lg w-full text-center relative">
            <img
              src="/path-to-your-upi-qr.png"
              alt="UPI QR"
              className="mx-auto w-40 h-40 my-4"
            />
            <h2 className="text-xl font-bold mb-2">Scan to Pay with UPI</h2>
            <p className="mb-4 text-gray-700 font-mono break-all">{upiLink}</p>

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
  );
};

export default Donation;
