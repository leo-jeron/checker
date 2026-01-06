const express = require('express');
const router = express.Router();
const PublicHistory = require('../models/PublicHistoryModel');

// @route   GET /api/public-history
// @desc    Get all public history entries
// @access  Public
router.get('/', async (req, res) => {
    try {
        const history = await PublicHistory.find().sort({ date: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/public-history
// @desc    Add a new entry
// @access  Public
router.post('/', async (req, res) => {
    const { symptom, medicineDescription, effectiveness, user } = req.body;

    const newEntry = new PublicHistory({
        symptom,
        medicineDescription,
        effectiveness,
        user
    });

    try {
        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
