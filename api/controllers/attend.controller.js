import Worker from '../models/worker.model.js'
import Attendance from '../models/attendance.model.js'
import Location from '../models/location.model.js'
import Boss from '../models/user.model.js'
export const markAttendance = async (req, res) => {
  try {
    const { workerId, locationId, date, status } = req.body;
    const bossId = req.user.id;
    const boss = await Boss.findById(bossId);
    if (!boss) {
      return res.status(404).json({ msg: 'Boss not found' });
    }

    if (!boss.workers.includes(workerId)) {
      return res.status(400).json({ msg: 'Worker does not belong to this boss' });
    }

    const worker = await Worker.findById(workerId);
    const location = await Location.findById(locationId);

    if (!worker || !location) {
      return res.status(404).json({ msg: 'Worker or Location not found' });
    }

    const attendance = new Attendance({
      worker: worker._id,
      location: location._name,
      date,
      status: status || 'absent',
    });

    await attendance.save();
    res.status(200).json({ msg: 'Attendance marked successfully', attendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

