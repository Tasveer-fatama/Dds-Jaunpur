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
        const res = await axios.get(" https://ddsgroup.onrender.com/api/admin/counts");
        setCounts(res.data); // { inquiry: x, admission: y, donation: z }
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };
    fetchCounts();
  }, []);

  // ✅ Certificate Upload
 const [form,setForm]=useState({
 name:"",
 fatherName:"",
 rollNumber:"",
 dob:"",
 course:"",
 duration:"",
 startDate:"",
 endDate:"",
 issueDate:"",
 grade:"",
 totalMarks:"",
 subjects:[]
});

const [photo,setPhoto]=useState(null);

const addSubject=()=>{
 setForm({
  ...form,
  subjects:[
   ...form.subjects,
   {name:"",theory:"",practical:"",total:""}
  ]
 });
};

const handleChange=(e)=>{
 setForm({...form,[e.target.name]:e.target.value});
};

const handleSubject=(i,e)=>{
 const newSub=[...form.subjects];
 newSub[i][e.target.name]=e.target.value;
 setForm({...form,subjects:newSub});
};

const submit=async()=>{
 const fd=new FormData();

 Object.keys(form).forEach(k=>{
  fd.append(k, JSON.stringify(form[k]));
 });

 fd.append("photo",photo);

 const res=await axios.post(
 "https://ddsgroup.onrender.com/api/certificate/create",
 fd
 );

 window.open(
 `https://ddsgroup.onrender.com/api/certificate/pdf/${res.data._id}`
 );

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

      {/* Certificate Upload */}
    <div className="p-10">

<h1 className="text-2xl font-bold mb-6">
Admin Panel
</h1>

<input
placeholder="Name"
name="name"
onChange={handleChange}
className="input"
/>

<input
placeholder="Father Name"
name="fatherName"
onChange={handleChange}
className="input"
/>

<input
placeholder="Roll Number"
name="rollNumber"
onChange={handleChange}
className="input"
/>

<input
type="date"
name="dob"
onChange={handleChange}
className="input"
/>

<input
placeholder="Course"
name="course"
onChange={handleChange}
className="input"
/>

<input
placeholder="Duration"
name="duration"
onChange={handleChange}
className="input"
/>

<input
type="file"
onChange={(e)=>setPhoto(e.target.files[0])}
/>

<button
onClick={addSubject}
className="bg-blue-500 text-white px-3 py-1"
>
Add Subject
</button>

{
form.subjects.map((s,i)=>(
<div key={i}>

<input
placeholder="Subject"
name="name"
onChange={(e)=>handleSubject(i,e)}
/>

<input
placeholder="Theory"
name="theory"
onChange={(e)=>handleSubject(i,e)}
/>

<input
placeholder="Practical"
name="practical"
onChange={(e)=>handleSubject(i,e)}
/>

<input
placeholder="Total"
name="total"
onChange={(e)=>handleSubject(i,e)}
/>

</div>
))
}

<button
onClick={submit}
className="bg-green-600 text-white px-4 py-2 mt-4"
>
Generate PDF
</button>

</div>

    </div>
  );
}
