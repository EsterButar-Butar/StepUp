/**
 * Analysis Controller — Mengecek status analisis AI untuk assessment terbaru user.
 * Digunakan oleh halaman Analyzing.jsx di Frontend untuk menentukan kapan pindah ke Result.
 */

const Assessment = require("../models/Assessment");

/**
 * GET /api/analysis/status
 * Mengecek apakah assessment terbaru milik user sudah diproses oleh AI.
 * Mengembalikan status: "completed", "pending", atau 404 jika belum ada assessment.
 */
exports.getAnalysisStatus = async (req, res, next) => {
    try {
        const latestAssessment = await Assessment.findOne({ userId: req.userId })
            .sort({ createdAt: -1 });

        if (!latestAssessment) {
            return res.status(404).json({
                message: "No assessment found for this user",
                status: "not_found"
            });
        }

        // Cek apakah AI sudah memberikan hasil
        const hasAIResult = latestAssessment.aiResult !== null && latestAssessment.aiResult !== undefined;

        res.status(200).json({
            status: hasAIResult ? "completed" : "pending",
            assessmentId: latestAssessment._id
        });
    } catch (error) {
        next(error);
    }
};
