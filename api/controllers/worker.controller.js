import Worker from '../models/worker.model.js'
// const Worker = require('../models/worker.model.js');
// const Boss = require('../models/user.model.js');
import Boss from '../models/user.model.js'

// Add a new worker and associate with a boss
export const createWorkerAndAddToBoss = async (req, res) => {
  try {
    const { name, mobile } = req.body; // name and email of the worker
    const bossId = req.user.id; // Assuming you get the boss ID from authentication token/session

    // Find the boss by ID
    const boss = await Boss.findById(bossId);
    if (!boss) {
      return res.status(404).json({ msg: 'Boss not found' });
    }

    // Check if the worker already exists (email should be unique)
    const existingWorker = await Worker.findOne({ mobile });
    if (existingWorker) {
      return res.status(400).json({ msg: 'Worker with this mobile already exists' });
    }

    // Create a new worker
    const newWorker = new Worker({
      name,
      mobile,
    });

    // Save the worker to the database
    const savedWorker = await newWorker.save();

    // Add the new worker to the boss's list
    boss.workers.push(savedWorker._id);
    await boss.save();

    res.status(200).json({ msg: 'Worker added successfully', worker: savedWorker });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

