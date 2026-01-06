const mongoose = require('mongoose');

const publicHistorySchema = new mongoose.Schema({
    symptom: {
        type: String,
        required: true
    },
    medicineDescription: {
        type: String,
        required: true
    },
    effectiveness: {
        type: String, // e.g., "Worked", "Did not work", "Partial relief"
        default: "Unknown"
    },
    user: {
        type: String,
        default: "Anonymous"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PublicHistory', publicHistorySchema);
