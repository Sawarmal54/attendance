import mongoose from 'mongoose'

const AttendanceSchema = new mongoose.Schema({
    worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['present', 'absent'], default: 'absent' }
  });

  const Attendance = mongoose.model('Attendance', AttendanceSchema);

  export default Attendance;