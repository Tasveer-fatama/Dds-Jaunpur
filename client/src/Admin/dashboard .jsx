import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  // ✅ Counts
  const [counts, setCounts] = useState({
    inquiry: 0,
    admission: 0,
    donation: 0,
  });

  // ✅ Certificate form
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    rollNumber: "",
    dob: "",
    course: "",
    duration: "",
    startDate: "",
    endDate: "",
    issueDate: "",
    grade: "",
    totalMarks: "",
    subjects: [
      {
        name: "",
        theory: "",
        practical: "",
        total: "",
      },
    ],
  });

  // ✅ Photo upload
  const [photo, setPhoto] = useState(null);

  // ✅ Fetch counts from backend
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get(
          "https://ddsgroup.onrender.com/api/admin/counts"
        );
        setCounts(res.data);
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };
    fetchCounts();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Handle subject change
  const handleSubject = (i, e) => {
    const newSub = [...form.subjects];
    newSub[i][e.target.name] = e.target.value;
    setForm({
      ...form,
      subjects: newSub,
    });
  };

  // ✅ Add new subject
  const addSubject = () => {
    setForm({
      ...form,
      subjects: [
        ...form.subjects,
        {
          name: "",
          theory: "",
          practical: "",
          total: "",
        },
      ],
    });
  };

  // ✅ Submit form and generate PDF
  const submit = async () => {
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("fatherName", form.fatherName);
      fd.append("rollNumber", form.rollNumber);
      fd.append("dob", form.dob);
      fd.append("course", form.course);
      fd.append("duration", form.duration);
      fd.append("startDate", form.startDate);
      fd.append("endDate", form.endDate);
      fd.append("issueDate", form.issueDate);
      fd.append("grade", form.grade);
      fd.append("totalMarks", form.totalMarks);
      fd.append("subjects", JSON.stringify(form.subjects));
      if (photo) {
        fd.append("photo", photo);
      }

      const res = await axios.post(
        "https://ddsgroup.onrender.com/api/certificate/create",
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Open generated PDF
      window.open(
        `https://ddsgroup.onrender.com/api/certificate/pdf/${res.data._id}`
      );

      alert("Certificate Generated ✅");
    } catch (err) {
      console.log(err.response?.data);
      alert("Error aa gaya ❌ console check karo");
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
          href="/admin/admission"
          className="bg-red-600 p-6 rounded-xl text-center cursor-pointer hover:bg-black transition block"
        >
          <h3 className="text-xl font-bold">Admission Details</h3>
          <p>Click to view all admissions</p>
        </a>

        <a
          href="/admin/donationdetails"
          className="bg-red-600 p-6 rounded-xl text-center cursor-pointer hover:bg-black transition block"
        >
          <h3 className="text-xl font-bold">Donation Details</h3>
          <p>Click to view all donations</p>
        </a>
      </div>

      {/* Certificate Form */}
      <div className="bg-white text-black p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Create Certificate + Marksheet</h2>

        <input
          placeholder="Student Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          placeholder="Father Name"
          name="fatherName"
          value={form.fatherName}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          placeholder="Roll Number"
          name="rollNumber"
          value={form.rollNumber}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          placeholder="Course"
          name="course"
          value={form.course}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          placeholder="Duration"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          type="date"
          name="issueDate"
          value={form.issueDate}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          placeholder="Grade"
          name="grade"
          value={form.grade}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          placeholder="Total Marks"
          name="totalMarks"
          value={form.totalMarks}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />

        <h3 className="font-bold mb-2">Subjects</h3>
        {form.subjects.map((s, i) => (
          <div key={i} className="grid grid-cols-4 gap-2 mb-2">
            <input
              placeholder="Subject"
              name="name"
              value={s.name}
              onChange={(e) => handleSubject(i, e)}
              className="border p-2"
            />
            <input
              placeholder="Theory"
              name="theory"
              value={s.theory}
              onChange={(e) => handleSubject(i, e)}
              className="border p-2"
            />
            <input
              placeholder="Practical"
              name="practical"
              value={s.practical}
              onChange={(e) => handleSubject(i, e)}
              className="border p-2"
            />
            <input
              placeholder="Total"
              name="total"
              value={s.total}
              onChange={(e) => handleSubject(i, e)}
              className="border p-2"
            />
          </div>
        ))}

        <button
          onClick={addSubject}
          className="bg-blue-600 text-white px-3 py-1 mb-4"
        >
          Add Subject
        </button>

        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="mb-4"
        />

        <button
          onClick={submit}
          className="bg-green-600 text-white px-4 py-2"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
}