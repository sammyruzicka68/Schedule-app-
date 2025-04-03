const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

// Get all schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ startTime: 1 });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new schedule
router.post('/', async (req, res) => {
  const schedule = new Schedule({
    title: req.body.title,
    description: req.body.description,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    location: req.body.location,
    priority: req.body.priority
  });

  try {
    const newSchedule = await schedule.save();
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a schedule
router.patch('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (schedule) {
      Object.assign(schedule, req.body);
      const updatedSchedule = await schedule.save();
      res.json(updatedSchedule);
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a schedule
router.delete('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (schedule) {
      await schedule.remove();
      res.json({ message: 'Schedule deleted' });
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 