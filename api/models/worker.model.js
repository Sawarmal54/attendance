import mongoose from "mongoose";


const WorkerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique:true},
});

const Worker = mongoose.model('Worker', WorkerSchema);

export default Worker;