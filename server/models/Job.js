import mongoose, { mongo } from "mongoose";

const JobSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  level: { type: String, required: true },
  salary: { type: Number, required: true },
  date: { type: Number, required: true },
  visible: { type: Boolean, required: true },
});

const Job = new mongoose.model("JobDetails", JobSchema);
export default Job;
