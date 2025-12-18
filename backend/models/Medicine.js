const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    salt_composition: { type: String, required: true, index: true },
    brand: { type: String, required: true },
    description: String,
    manufacturer: String,
    image_url: String
});

medicineSchema.index({ name: 'text', salt_composition: 'text' });

module.exports = mongoose.model('Medicine', medicineSchema);
