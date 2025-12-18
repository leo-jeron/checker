const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: {
        type: { type: String, default: "Point" },
        coordinates: { type: [Number], index: "2dsphere" } // [longitude, latitude]
    },
    address: { type: String, required: true },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    contact_number: String
});

module.exports = mongoose.model('Pharmacy', pharmacySchema);
