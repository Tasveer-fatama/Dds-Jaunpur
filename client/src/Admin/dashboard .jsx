import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {

const [counts,setCounts] = useState({
 inquiry:0,
 admission:0,
 donation:0
})

const [form,setForm] = useState({

 name:"",
 fatherName:"",
 rollNumber:"",
 dob:"",
 course:"A.D.C.A.",
 duration:"01 Year",

 startDate:"",
 endDate:"",
 issueDate:"",

 grade:"",
 totalMarks:"",

 subjects:[

  { name:"Basic Computer & MS Office", theory:"", practical:"", total:"" },

  { name:"PageMaker, CorelDraw, Photoshop", theory:"", practical:"", total:"" },

  { name:"Tally Prime", theory:"", practical:"", total:"" },

  { name:"Internet & Online Working", theory:"", practical:"", total:"" }

 ]

})

const [photo,setPhoto] = useState(null)


// counts
useEffect(()=>{

 axios
 .get("https://ddsgroup.onrender.com/api/admin/counts")
 .then(res=> setCounts(res.data))
 .catch(err=> console.log(err))

},[])



// input change
const handleChange = e => {

 setForm({

  ...form,
  [e.target.name]:e.target.value

 })

}


// subject change
const handleSubject = (i,e)=>{

 const updated = [...form.subjects]

 updated[i][e.target.name] = e.target.value

 // auto total
 if(e.target.name==="theory" || e.target.name==="practical"){

 const theory = Number(updated[i].theory)
 const practical = Number(updated[i].practical)

 updated[i].total = theory + practical

 }

 setForm({

  ...form,
  subjects:updated

 })

}



// total marks auto
useEffect(()=>{

 const sum = form.subjects.reduce((acc,s)=> acc + Number(s.total || 0),0)

 setForm(prev=>({

  ...prev,
  totalMarks:sum

 }))

},[form.subjects])



// submit
const submit = async ()=>{

 try{

 const fd = new FormData()

 Object.keys(form).forEach(key=>{

  if(key==="subjects"){

   fd.append("subjects",JSON.stringify(form.subjects))

  }

  else{

   fd.append(key,form[key])

  }

 })

 if(photo){

 fd.append("photo",photo)

 }


 const res = await axios.post(

 "https://ddsgroup.onrender.com/api/certificate/create",
 fd,
 {
 headers:{ "Content-Type":"multipart/form-data" }
 }

 )


 // open pdf
 window.open(

 `https://ddsgroup.onrender.com/api/certificate/pdf/${res.data.id}`

 )

 alert("PDF Generated ✅")

 }

 catch(err){

 console.log(err.response?.data)

 alert("error ❌")

 }

}




return(

<div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-800 text-white p-6">

<h1 className="text-3xl font-bold text-center mb-6">
DDS Admin Panel
</h1>



{/* counts */}

<div className="grid md:grid-cols-3 gap-4 mb-10">

<div className="bg-white text-black p-4 rounded">
Inquiry {counts.inquiry}
</div>

<div className="bg-white text-black p-4 rounded">
Admission {counts.admission}
</div>

<div className="bg-white text-black p-4 rounded">
Donation {counts.donation}
</div>

</div>



{/* form */}

<div className="bg-white text-black p-6 rounded-xl">

<h2 className="text-xl font-bold mb-4">

Create Certificate + Marksheet

</h2>



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
className="border p-2 w-full mb-4"
/>



<h3 className="font-bold mb-2">
Subjects
</h3>



{form.subjects.map((s,i)=>(

<div
key={i}
className="grid grid-cols-4 gap-2 mb-2"
>

<input
value={s.name}
readOnly
className="border p-2 bg-gray-200"
/>



<input
placeholder="Theory"
name="theory"
value={s.theory}
onChange={e=>handleSubject(i,e)}
className="border p-2"
/>



<input
placeholder="Practical"
name="practical"
value={s.practical}
onChange={e=>handleSubject(i,e)}
className="border p-2"
/>



<input
value={s.total}
readOnly
className="border p-2 bg-gray-200"
/>

</div>

))}



<input
placeholder="Grade"
name="grade"
value={form.grade}
onChange={handleChange}
className="border p-2 w-full mb-2"
/>



<input
value={form.totalMarks}
readOnly
className="border p-2 w-full mb-4 bg-gray-200"
/>



<input
type="file"
onChange={e=> setPhoto(e.target.files[0])}
className="mb-4"
/>



<button
onClick={submit}
className="bg-green-600 text-white px-4 py-2 rounded"
>

Generate PDF

</button>

</div>

</div>

)

}