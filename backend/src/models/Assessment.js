const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
    personalInfo: {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        linkedin: { type: String },
        location: { type: String },
        bio: { type: String },
        careerGoal: { type: String },
        avatarUrl: { type: String }
    },
    education: {
        major: { type: String, required: true },
        university: { type: String, required: true },
        semester: { type: String },
        gpa: { type: Number }
    },
    skills: {
        hardSkills: { type: [String], required: true },
        softSkills: { type: [String], required: true },
        experienceLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true }
    },
    experience: {
        projects: [{
            projectName: { type: String },
            role: { type: String },
            issuesSolved: { type: String },
            description: { type: String }
        }],
        internships: [{
            position: { type: String },
            company: { type: String },
            duration: { type: String },
            responsibilities: { type: String }
        }],
        organizations: [{
            organizationName: { type: String },
            role: { type: String },
            duration: { type: String }
        }],
        certifications: [{
            certificateName: { type: String },
            issuer: { type: String },
            year: { type: String }
        }]
    },
    aiResult: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Assessment", assessmentSchema);
