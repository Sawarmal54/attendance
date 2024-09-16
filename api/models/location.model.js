import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String }
  });
  
const Location = mongoose.model('Location', LocationSchema);


export default Location;