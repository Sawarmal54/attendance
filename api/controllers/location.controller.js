import Location from '../models/location.model.js'
// const Worker = require('../models/worker.model.js');
// const Boss = require('../models/user.model.js');
import Boss from '../models/user.model.js'

// Add a new worker and associate with a boss
export const createLocationAndAddToBoss = async (req, res) => {
  try {
    const { name, address } = req.body; // name and email of the worker
    const bossId = req.user.id; // Assuming you get the boss ID from authentication token/session

    // Find the boss by ID
    const boss = await Boss.findById(bossId);
    if (!boss) {
      return res.status(404).json({ msg: 'Boss not found' });
    }

    // Check if the worker already exists (email should be unique)
    const existingLocation = await Location.findOne({ name });
    if (existingLocation) {
      return res.status(400).json({ msg: 'Location with this name already exists' });
    }

    // Create a new worker
    const newLocation = new Location({
      name,
      address,
    });

    // Save the worker to the database
    const savedLocation = await newLocation.save();

    // Add the new worker to the boss's list
    boss.locations.push(savedLocation._id);
    await boss.save();

    res.status(200).json({ msg: 'Location added successfully', location: savedLocation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

