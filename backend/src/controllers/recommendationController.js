const Assessment = require("../models/Assessment");

// ================================================
// FUNGSI TRANSFORMER: Ubah format AI → format Frontend
// ================================================
function transformAItoFrontend(aiResult) {
    if (!aiResult) return null;

    const recs = aiResult.top_3_recommendations || [];
    const gap = aiResult.skill_gap || {};
    const atsCv = aiResult.ats_cv || {};

    // --- Capitalize nama job role (misal "data scientist" → "Data Scientist") ---
    function capitalize(str) {
        return str.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }

    // --- Transform career_recommendations (untuk TopMatchesGrid & MatchCard) ---
    const career_recommendations = recs.map((rec, index) => {
        const scorePercent = Math.round(rec.match_score * 100);
        return {
            title: capitalize(rec.job_role),
            match: scorePercent,
            score: scorePercent,
            category: rec.category,
            description: `Karir di bidang ${rec.category} sebagai ${capitalize(rec.job_role)}.`,
            readiness: scorePercent >= 70 ? "High" : scorePercent >= 40 ? "Good" : "Moderate",
            progress: scorePercent
        };
    });

    // --- Transform skill_gap (untuk SkillGap.jsx shared component) ---
    const allMatched = [
        ...(gap.hard_skill_gap?.matched || []),
        ...(gap.soft_skill_gap?.matched || [])
    ];

    const skill_gap = {
        skillsHave: allMatched,
        skillsImprove: (gap.missing_skills || []).map(skill => ({
            name: capitalize(skill),
            level: "Beginner",
            progress: 20
        })),
        missingSkills: gap.missing_skills || []
    };

    // --- Transform skill_gap_detailed (untuk SkillGap.jsx di halaman Result) ---
    const skill_gap_detailed = {
        tech: {
            title: "Tech Skills",
            have: (gap.hard_skill_gap?.matched || []).map(s => ({
                name: capitalize(s),
                level: "Proficient"
            })),
            improve: (gap.hard_skill_gap?.missing || []).map(s => ({
                name: capitalize(s),
                desc: "Skill yang perlu dipelajari"
            }))
        },
        soft: {
            title: "Soft Skills",
            have: (gap.soft_skill_gap?.matched || []).map(s => ({
                name: capitalize(s),
                level: "Strong skill"
            })),
            improve: (gap.soft_skill_gap?.missing || []).map(s => ({
                name: capitalize(s),
                desc: "Perlu ditingkatkan"
            }))
        }
    };

    // --- Transform match_breakdown (untuk MatchBreakdown.jsx) ---
    const topScore = recs.length > 0 ? Math.round(recs[0].match_score * 100) : 0;
    const match_breakdown = [
        { label: "Technical Skills", value: Math.min(topScore + 5, 100) },
        { label: "Interests", value: Math.min(topScore + 10, 100) },
        { label: "Experience", value: Math.max(topScore - 10, 0) },
        { label: "Academic Alignment", value: Math.min(topScore + 8, 100) }
    ];

    return {
        career_recommendations,
        skill_gap,
        skill_gap_detailed,
        match_breakdown,
        ats_cv: atsCv,
        affirmation: gap.affirmation || "",
        genai_explanation: aiResult.genai_explanation || ""
    };
}

// ================================================
// GET RECOMMENDATION BY ASSESSMENT ID
// ================================================
exports.getRecommendation = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id);

        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found" });
        }

        // Kalau assessment belum punya hasil AI, kasih tau Frontend
        if (!assessment.aiResult) {
            return res.status(200).json({
                message: "AI result belum tersedia untuk assessment ini",
                assessment_data: assessment,
                career_recommendations: [],
                skill_gap: null,
                skill_gap_detailed: null,
                match_breakdown: [],
                ats_cv: null
            });
        }

        // Transform AI result ke format Frontend
        const frontendData = transformAItoFrontend(assessment.aiResult);

        res.json({
            assessment_data: assessment,
            ...frontendData
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching recommendation",
            error: error.message
        });
    }
};
