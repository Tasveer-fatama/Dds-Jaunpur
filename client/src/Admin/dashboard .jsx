import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  // ✅ Counts
  const [counts, setCounts] = useState({
    inquiry: 0,
    admission: 0,
    donation: 0,
  });


 
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

  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    course: "",
    duration: "",
    regNo: "",
    session: "",
    subjects: []
  });

  const addSubject = () => {
    setForm({
      ...form,
      subjects: [...form.subjects, { name: "", theory: "", practical: "" }]
    });
  };

  const handleSubjectChange = (i, field, value) => {
    const updated = [...form.subjects];
    updated[i][field] = value;
    setForm({ ...form, subjects: updated });
  };

  const handleSubmit = async () => {
    const total = form.subjects.reduce(
      (sum, s) => sum + Number(s.theory) + Number(s.practical),
      0
    );

    const data = { ...form, total, grade: "A" };

    axios.post("https://ddsgroup.onrender.com/api/certificate/create", data)
  .then(res => console.log(res))
  .catch(err => {
    console.log("FULL ERROR:", err);
    console.log("BACKEND ERROR:", err.response?.data);
  });

    alert("PDF Generated!");

    // RESET
    setForm({
      name: "",
      fatherName: "",
      course: "",
      duration: "",
      regNo: "",
      session: "",
      subjects: []
    });
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

     /*certificate form */
      <div className="p-6">
      <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})} />
      <input placeholder="Father Name" onChange={(e)=>setForm({...form,fatherName:e.target.value})} />
      <input placeholder="Course" onChange={(e)=>setForm({...form,course:e.target.value})} />
      <input placeholder="Duration" onChange={(e)=>setForm({...form,duration:e.target.value})} />
      <input placeholder="Reg No" onChange={(e)=>setForm({...form,regNo:e.target.value})} />

      <button onClick={addSubject}>Add Subject</button>

      {form.subjects.map((sub, i) => (
        <div key={i}>
          <input placeholder="Subject" onChange={(e)=>handleSubjectChange(i,"name",e.target.value)} />
          <input placeholder="Theory" onChange={(e)=>handleSubjectChange(i,"theory",e.target.value)} />
          <input placeholder="Practical" onChange={(e)=>handleSubjectChange(i,"practical",e.target.value)} />
        </div>
      ))}

      <button onClick={handleSubmit}>Submit</button>
    </div>
    </div>
  );
}