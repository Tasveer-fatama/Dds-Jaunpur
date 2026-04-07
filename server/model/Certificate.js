import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({

 name:String,

 fatherName:String,

 rollNumber:String,

 dob:String,

 course:String,

 duration:String,

 grade:String,

 totalMarks:Number,

 photo:String,

 issueDate:String,

 startDate:String,

 endDate:String,


 // marksheet subjects

 subjects:[

 {

 name:String,

 theory:Number,

 practical:Number,

 total:Number

 }

 ],


 // pdf file name save hoga

 pdf:String

});


export default mongoose.model(

"certificate",

certificateSchema

);