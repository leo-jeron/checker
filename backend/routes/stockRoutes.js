const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

// Get stock for a medicine (sorted by price or nearby? - for now just list all)
router.get('/medicine/:medicineId', async (req, res) => {
    try {
        const { lat, lng } = req.query;

        let stocks = await Stock.find({ medicine: req.params.medicineId, quantity: { $gt: 0 } })
            .populate('pharmacy')
            .sort({ price: 1 }); // Default sort by price

        // If location is provided, we could calculate distance here or use aggregation
        // For MVP simplicity: Fetch all and sort/filter in memory or basic sort

        res.json(stocks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all stock for a specific pharmacy
router.get('/pharmacy/:pharmacyId', async (req, res) => {
    try {
        const stocks = await Stock.find({ pharmacy: req.params.pharmacyId })
            .populate('medicine')
            .sort({ last_updated: -1 }); // Recently updated first
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Stock (Pharmacy Owner)
router.post('/update', async (req, res) => {
    try {
        const { pharmacyId, medicineId, price, quantity } = req.body;
        // In real app: verify user owns pharmacy

        const stock = await Stock.findOneAndUpdate(
            { pharmacy: pharmacyId, medicine: medicineId },
            { price, quantity, last_updated: Date.now() },
            { new: true, upsert: true } // Create if not exists
        );
        res.json(stock);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
