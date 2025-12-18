const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');

// Search Medicines - supports partial matches
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ message: 'Query is required' });

        // Use regex for partial matching (case-insensitive)
        const searchRegex = new RegExp(query, 'i');

        const medicines = await Medicine.find({
            $or: [
                { name: searchRegex },
                { salt_composition: searchRegex },
                { brand: searchRegex }
            ]
        });

        res.json(medicines);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Medicine Details
router.get('/:id', async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
        res.json(medicine);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Alternatives (by salt composition)
router.get('/:id/alternatives', async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) return res.status(404).json({ message: 'Medicine not found' });

        const alternatives = await Medicine.find({
            salt_composition: medicine.salt_composition,
            _id: { $ne: medicine._id } // Exclude itself
        }).limit(5);

        res.json(alternatives);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
