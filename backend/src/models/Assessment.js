const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
    major: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    interests: {
        type: [String],
        required: true
    },
    experience: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Assessment", assessmentSchema);
