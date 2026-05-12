const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
    personalInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        linkedin: { type: String },
        location: { type: String }
    },
    education: {
        major: { type: String, required: true },
        university: { type: String, required: true },
        currentSemester: { type: String },
        gpa: { type: Number }
    },
    experience: {
        internships: { type: [String] },
        organizations: { type: [String] },
        projects: { type: [String] },
        certifications: { type: [String] }
    },
    skills: {
        hardSkills: { type: [String], required: true },
        softSkills: { type: [String], required: true }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Assessment", assessmentSchema);
