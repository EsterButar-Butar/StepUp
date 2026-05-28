/**
 * Recommendation Controller — Mengambil hasil analisis AI untuk assessment tertentu
 * dan mengembalikannya dalam format yang siap di-render oleh komponen React Frontend.
 */

const Assessment = require("../models/Assessment");
const { transformAItoFrontend } = require("../utils/aiTransformer");

/**
 * GET /api/recommendation/:id
 * Mengambil rekomendasi karir berdasarkan ID assessment.
 * Data AI yang tersimpan di MongoDB akan di-transform ke format Frontend.
 */
exports.getRecommendation = async (req, res) => {
    try {
        let assessmentId = req.params.id;
        let selectedIndex = 0;

        // Mendukung format id: <assessmentId>_<selectedIndex>
        if (assessmentId.includes("_")) {
            const parts = assessmentId.split("_");
            assessmentId = parts[0];
            selectedIndex = parseInt(parts[1]) || 0;
        }

        const assessment = await Assessment.findById(assessmentId);

        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found" });
        }

        // Jika AI belum memproses assessment ini, kembalikan state kosong
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

        // Transform hasil AI ke format yang dibutuhkan komponen Frontend
        const frontendData = transformAItoFrontend(assessment.aiResult, assessment, selectedIndex);

        res.json({
            assessment_data: assessment,
            ...frontendData
        });

    } catch (error) {
        console.error("Error in getRecommendation:", error);
        res.status(500).json({
            message: "Error fetching recommendation",
            error: error.message
        });
    }
};
