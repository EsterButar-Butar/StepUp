const Assessment = require("../models/Assessment");
const axios = require("axios");

// Mapping dari format MongoDB ke format yang diminta AI service (FastAPI)
// AI service (main.py) expects: { "resume_text": "...", "top_k": 5 }
function transformToAIPayload(assessment) {
    const { personalInfo, education, skills, experience } = assessment;

    // Build a simple string representation of the assessment to act as a resume
    let resumeText = `${personalInfo.fullName || ""} ${personalInfo.bio || ""}. `;
    
    if (education.university || education.major) {
        resumeText += `Education: ${education.university || ""} ${education.major || ""}. `;
    }

    if (skills.hardSkills && skills.hardSkills.length > 0) {
        resumeText += `Skills: ${skills.hardSkills.join(", ")}. `;
    }
    
    // Tidak memasukkan softSkills ke resumeText agar tidak merusak akurasi AI (bias ke profesi non-tech)
    // AI team/model lebih akurat jika hanya mencocokkan Hard Skills / Technical Skills.
    // if (skills.softSkills && skills.softSkills.length > 0) {
    //     resumeText += `Soft Skills: ${skills.softSkills.join(", ")}. `;
    // }

    if (experience.projects && experience.projects.length > 0) {
        resumeText += `Projects: ${experience.projects.map(p => 
            `${p.projectName || ""} (${p.role || ""}): ${p.description || ""} ${p.issuesSolved || ""}`
        ).join(", ")}. `;
    }

    if (experience.internships && experience.internships.length > 0) {
        resumeText += `Experience: ${experience.internships.map(i => 
            `${i.position || ""} at ${i.company || ""} (${i.duration || ""}): ${i.responsibilities || ""}`
        ).join(", ")}. `;
    }

    if (experience.organizations && experience.organizations.length > 0) {
        resumeText += `Organizations: ${experience.organizations.map(o => 
            `${o.role || ""} at ${o.organizationName || ""} (${o.duration || ""})`
        ).join(", ")}. `;
    }

    if (experience.certifications && experience.certifications.length > 0) {
        resumeText += `Certifications: ${experience.certifications.map(c => 
            `${c.certificateName || ""} from ${c.issuer || ""} (${c.year || ""})`
        ).join(", ")}. `;
    }

    return {
        resume_text: resumeText.trim(),
        top_k: 50
    };
}

exports.getAllAssessments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Kalau user login, tampilkan miliknya saja. Kalau tidak, tampilkan semua (backward compat)
        const filter = req.userId ? { userId: req.userId } : {};

        const [assessments, total] = await Promise.all([
            Assessment.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Assessment.countDocuments(filter)
        ]);

        res.json({
            message: "Success fetching assessments",
            data: assessments,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching assessments",
            error: error.message
        });
    }
};

exports.getAssessmentById = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id);

        if (!assessment) {
            return res.status(404).json({ message: "Assessment tidak ditemukan" });
        }

        // Cek ownership — kalau punya userId, harus cocok dengan user yang request
        if (assessment.userId && req.userId && assessment.userId.toString() !== req.userId) {
            return res.status(403).json({ message: "Tidak punya akses ke assessment ini" });
        }

        res.json({ data: assessment });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching assessment",
            error: error.message
        });
    }
};

exports.createAssessment = async (req, res) => {
    try {
        const { personalInfo, education, experience, skills } = req.body;

        // Simpan dulu ke DB sebelum panggil AI, biar data ga hilang kalau AI down
        const newAssessment = new Assessment({
            userId: req.userId || null,
            personalInfo,
            education,
            experience,
            skills
        });
        const savedAssessment = await newAssessment.save();

        const aiPayload = transformToAIPayload(savedAssessment);

        // Panggil AI service — kalau gagal, assessment tetap tersimpan
        let aiResult = null;
        const aiApiUrl = process.env.AI_API_URL || "http://TUNGGU_LINK_DARI_TIM_AI/predict";

        try {
            console.log("Mengirim data ke AI:", aiApiUrl);
            const aiResponse = await axios.post(aiApiUrl, aiPayload, {
                timeout: 60000
            });
            aiResult = aiResponse.data;
            console.log("AI Response diterima!");

            savedAssessment.aiResult = aiResult;
            await savedAssessment.save();
        } catch (aiError) {
            // FIXME: harusnya simpan error ini ke DB juga biar bisa di-retry nanti
            console.error("Warning: Gagal menghubungi API AI -", aiError.message);
        }

        res.status(201).json({
            message: "Assessment saved successfully",
            data: {
                data: savedAssessment
            },
            ai_recommendation: aiResult
        });

    } catch (error) {
        res.status(500).json({
            message: "Error saving assessment",
            error: error.message
        });
    }
};

exports.deleteAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id);

        if (!assessment) {
            return res.status(404).json({ message: "Assessment tidak ditemukan" });
        }

        if (assessment.userId && req.userId && assessment.userId.toString() !== req.userId) {
            return res.status(403).json({ message: "Tidak punya akses untuk menghapus assessment ini" });
        }

        await Assessment.findByIdAndDelete(req.params.id);

        res.json({ message: "Assessment berhasil dihapus" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting assessment",
            error: error.message
        });
    }
};
