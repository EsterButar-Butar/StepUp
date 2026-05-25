const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ["Technical Skill", "Soft Skill"]
    }
});

// Biar ga ada skill duplikat dengan nama + kategori yang sama
skillSchema.index({ name: 1, category: 1 }, { unique: true });

module.exports = mongoose.model("Skill", skillSchema);
