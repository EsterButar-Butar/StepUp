const Skill = require("../models/Skill");

const DEFAULT_SKILLS = [
    { name: "Communication", category: "Soft Skill" },
    { name: "Leadership", category: "Soft Skill" },
    { name: "Teamwork", category: "Soft Skill" },
    { name: "Problem Solving", category: "Soft Skill" },
    { name: "Critical Thinking", category: "Soft Skill" },
    { name: "Public Speaking", category: "Soft Skill" },
    { name: "Time Management", category: "Soft Skill" },
    { name: "Adaptability", category: "Soft Skill" },
    { name: "Python", category: "Technical Skill" },
    { name: "JavaScript", category: "Technical Skill" },
    { name: "SQL", category: "Technical Skill" },
    { name: "Data Analysis", category: "Technical Skill" },
    { name: "Machine Learning", category: "Technical Skill" },
    { name: "React", category: "Technical Skill" },
    { name: "Node.js", category: "Technical Skill" },
    { name: "Excel", category: "Technical Skill" },
    { name: "Figma", category: "Technical Skill" },
    { name: "Git", category: "Technical Skill" },
    { name: "Docker", category: "Technical Skill" },
    { name: "AWS", category: "Technical Skill" }
];

exports.getAllSkills = async (req, res) => {
    try {
        let skills = await Skill.find().sort({ category: 1, name: 1 });

        // Kalau DB masih kosong, seed otomatis biar frontend ga dapet array kosong
        if (skills.length === 0) {
            await Skill.insertMany(DEFAULT_SKILLS);
            skills = await Skill.find().sort({ category: 1, name: 1 });
            console.log("Skills di-seed otomatis karena collection kosong");
        }

        res.json(skills);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching skills",
            error: error.message
        });
    }
};

// Development only — reset dan seed ulang skill list
exports.seedSkills = async (req, res) => {
    try {
        await Skill.deleteMany({});
        const inserted = await Skill.insertMany(DEFAULT_SKILLS);
        res.json({
            message: `${inserted.length} skills berhasil di-seed`,
            data: inserted
        });
    } catch (error) {
        res.status(500).json({
            message: "Error seeding skills",
            error: error.message
        });
    }
};
