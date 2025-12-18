const express = require('express');
const router = express.Router();
const Pharmacy = require('../models/Pharmacy');

// Create Pharmacy
router.post('/', async (req, res) => {
    try {
        const pharmacy = new Pharmacy(req.body);
        await pharmacy.save();
        res.status(201).json(pharmacy);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all pharmacies (for debugging/listing)
router.get('/', async (req, res) => {
    try {
        const pharmacies = await Pharmacy.find();
        res.json(pharmacies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
