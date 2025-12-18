const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
    pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy', required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 },
    last_updated: { type: Date, default: Date.now }
});

stockSchema.index({ medicine: 1, pharmacy: 1 }, { unique: true });

module.exports = mongoose.model('Stock', stockSchema);
