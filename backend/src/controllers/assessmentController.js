const Assessment = require("../models/Assessment");
const axios = require("axios");


// FUNGSI TRANSFORMER: Ubah format MongoDB → format AI

function transformToAIPayload(assessment) {
    const { personalInfo, education, skills, experience } = assessment;

    // Parse semester dari "Semester 5" jadi angka 5
    let semesterNum = 0;
    if (education.semester) {
        const match = education.semester.match(/\d+/);
        if (match) semesterNum = parseInt(match[0]);
    }

    return {
        name: personalInfo.fullName || "",
        email: personalInfo.email || "",
        phone: personalInfo.phone || "",
        linkedin: personalInfo.linkedin || "",
        location: personalInfo.location || "",
        major: education.major || "",
        education: education.university || "",
        semester: semesterNum,
        gpa: education.gpa || 0.0,
        hard_skills: skills.hardSkills || [],
        soft_skills: skills.softSkills || [],
        projects: (experience.projects || []).map(p => p.projectName).filter(Boolean),
        internships: (experience.internships || []).map(i => i.position).filter(Boolean),
        organizations: (experience.organizations || []).map(o => o.organizationName).filter(Boolean),
        certifications: (experience.certifications || []).map(c => c.certificateName).filter(Boolean)
    };
}

// ================================================
// GET ALL ASSESSMENTS
// ================================================
exports.getAllAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.find();
        res.json({
            message: "Success fetching assessments",
            data: assessments
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching assessments",
            error: error.message
        });
    }
};

// ================================================
// CREATE ASSESSMENT + KIRIM KE AI
// ================================================
exports.createAssessment = async (req, res) => {
    try {
        const { personalInfo, education, experience, skills } = req.body;

        // 1. Simpan data form ke MongoDB dulu
        const newAssessment = new Assessment({
            personalInfo,
            education,
            experience,
            skills
        });
        const savedAssessment = await newAssessment.save();

        // 2. Transform data ke format yang diminta AI
        const aiPayload = transformToAIPayload(savedAssessment);

        // 3. Kirim ke API AI
        let aiResult = null;
        const aiApiUrl = process.env.AI_API_URL || "http://TUNGGU_LINK_DARI_TIM_AI/predict";

        try {
            console.log("Mengirim data ke AI:", aiApiUrl);
            const aiResponse = await axios.post(aiApiUrl, aiPayload, {
                timeout: 60000 // Timeout 60 detik (AI bisa lambat)
            });
            aiResult = aiResponse.data;
            console.log("AI Response diterima!");

            // 4. Simpan hasil AI ke document Assessment yang sama
            savedAssessment.aiResult = aiResult;
            await savedAssessment.save();

        } catch (aiError) {
            console.error("Warning: Gagal menghubungi API AI -", aiError.message);
        }

        // 5. Kirim response ke Frontend
        res.status(201).json({
            message: "Assessment saved successfully",
            data: savedAssessment,
            ai_recommendation: aiResult
        });

    } catch (error) {
        res.status(500).json({
            message: "Error saving assessment",
            error: error.message
        });
    }
};
