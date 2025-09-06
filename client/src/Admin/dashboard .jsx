import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [counts, setCounts] = useState({
    inquiry: 0,
    admission: 0,
    donation: 0,
  });

  const [cert, setCert] = useState({ name: "", roll: "", file: null });

  // ✅ Fetch counts from backend
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/counts");
        setCounts(res.data); // { inquiry: x, admission: y, donation: z }
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };
    fetchCounts();
  }, []);

  // ✅ Certificate Upload
  const handleCertSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", cert.name);
      formData.append("roll", cert.roll);
      formData.append("file", cert.file);

      await axios.post("http://localhost:5000/api/certificates/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Certificate uploaded successfully ✅");
      setCert({ name: "", roll: "", file: null });
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-800 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to Admin Panel
      </h1>

      {/* Counts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white text-black p-6 rounded-xl shadow-lg text-center hover:scale-105 transition">
          <h2 className="text-xl font-bold">Inquiry Forms</h2>
          <p className="text-3xl text-red-600">{counts.inquiry}</p>
        </div>
        <div className="bg-white text-black p-6 rounded-xl shadow-lg text-center hover:scale-105 transition">
          <h2 className="text-xl font-bold">Admission Forms</h2>
          <p className="text-3xl text-red-600">{counts.admission}</p>
        </div>
        <div className="bg-white text-black p-6 rounded-xl shadow-lg text-center hover:scale-105 transition">
          <h2 className="text-xl font-bold">Donations</h2>
          <p className="text-3xl text-red-600">{counts.donation}</p>
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <a
          href="/admin/inquiries"
          className="bg-red-600 p-6 rounded-xl text-center cursor-pointer hover:bg-black transition block"
        >
          <h3 className="text-xl font-bold">Inquiry Details</h3>
          <p>Click to view all inquiries</p>
        </a>

        <a
          href="/admin/admissions"
          className="bg-red-600 p-6 rounded-xl text-center cursor-pointer hover:bg-black transition block"
        >
          <h3 className="text-xl font-bold">Admission Details</h3>
          <p>Click to view all admissions</p>
        </a>

        <a
          href="/admin/donations"
          className="bg-red-600 p-6 rounded-xl text-center cursor-pointer hover:bg-black transition block"
        >
          <h3 className="text-xl font-bold">Donation Details</h3>
          <p>Click to view all donations</p>
        </a>
      </div>

      {/* Certificate Upload */}
      <div className="bg-white text-black p-6 rounded-xl shadow-lg max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-red-600">
          Upload Student Certificate
        </h2>
        <form onSubmit={handleCertSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Student Name"
            value={cert.name}
            onChange={(e) => setCert({ ...cert, name: e.target.value })}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Roll Number"
            value={cert.roll}
            onChange={(e) => setCert({ ...cert, roll: e.target.value })}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="file"
            onChange={(e) => setCert({ ...cert, file: e.target.files[0] })}
            className="w-full p-3 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-black transition"
          >
            Upload Certificate
          </button>
        </form>
      </div>
    </div>
  );
}
