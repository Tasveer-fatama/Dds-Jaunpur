import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    course: { type: String, required: true },
    mode: { type: String, enum: ["Online", "Offline"], required: true },
  },
  { timestamps: true }
);

const Admission = mongoose.model("Admission", admissionSchema);
export default Admission;
