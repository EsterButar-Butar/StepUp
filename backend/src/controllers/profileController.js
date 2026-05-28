/**
 * Profile Controller — Mengambil data profil user beserta statistik assessment.
 * Digunakan oleh halaman Dashboard/Profile di Frontend.
 */

const Assessment = require("../models/Assessment");
const User = require("../models/User");

/**
 * GET /api/profile
 * Mengambil profil user, statistik, progress chart, dan aktivitas terbaru.
 */
exports.getProfileData = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const assessments = await Assessment.find({ userId: req.userId })
            .sort({ createdAt: -1 });

        const totalAssessments = assessments.length;
        const latestAssessment = assessments[0];

        // Hitung skor tertinggi dari assessment terbaru
        let latestScore = 0;
        if (totalAssessments > 0) {
            latestScore = extractTopScore(latestAssessment);
        }

        const latestRecs = latestAssessment?.aiResult?.career_recommendations
            || latestAssessment?.aiResult?.top_3_recommendations
            || [];
        const topCareer = latestRecs.length > 0 ? (latestRecs[0].title || latestRecs[0].job_role) : null;

        const profile = {
            name: user.name,
            email: user.email,
            avatarUrl: latestAssessment?.personalInfo?.avatarUrl || "",
            profileImage: latestAssessment?.personalInfo?.avatarUrl || "",
            bio: latestAssessment?.personalInfo?.bio || "",
            phone: latestAssessment?.personalInfo?.phone || "",
            location: latestAssessment?.personalInfo?.location || "",
            linkedin: latestAssessment?.personalInfo?.linkedin || "",
            university: latestAssessment?.education?.university || "",
            major: latestAssessment?.education?.major || "",
            role: topCareer ? capitalize(topCareer) : "StepUp Member"
        };

        const stats = {
            totalAssessments,
            latestScore
        };

        const summary = {
            totalSkills: countUserSkills(assessments),
            completedAssessments: totalAssessments,
            learningHours: 0,
            topCareer: topCareer ? capitalize(topCareer) : "Not available",
            atsScore: latestScore
        };

        // Data progress step-by-step onboarding untuk komponen AssessmentProgress
        const steps = [
            {
                id: "step-1",
                title: "Registrasi Akun",
                description: "Akun Anda berhasil dibuat.",
                completed: true,
                score: 100
            },
            {
                id: "step-2",
                title: "Personal Info & Pendidikan",
                description: totalAssessments > 0 ? "Data diri dan pendidikan telah diisi." : "Lengkapi profil data diri dan pendidikan Anda.",
                completed: totalAssessments > 0,
                score: totalAssessments > 0 ? 100 : 0
            },
            {
                id: "step-3",
                title: "Skills & Pengalaman Kerja",
                description: totalAssessments > 0 ? "Data skills dan pengalaman telah diisi." : "Isi assessment tentang keahlian dan pengalaman kerja.",
                completed: totalAssessments > 0,
                score: totalAssessments > 0 ? 100 : 0
            },
            {
                id: "step-4",
                title: "AI Rekomendasi Karir",
                description: (latestAssessment && latestAssessment.aiResult) ? "Hasil analisis AI model siap dilihat." : "Menunggu AI memproses hasil analisis.",
                completed: !!(latestAssessment && latestAssessment.aiResult),
                score: (latestAssessment && latestAssessment.aiResult) ? 100 : 0
            }
        ];

        let currentStep = 1;
        if (totalAssessments > 0) {
            currentStep = 3;
            if (latestAssessment.aiResult) {
                currentStep = 4;
            }
        }

        const progress = {
            percentage: Math.round((currentStep / 4) * 100),
            currentStep,
            totalSteps: 4,
            steps
        };

        // 5 aktivitas terakhir
        const activities = assessments.slice(0, 5).map(a => ({
            id: a._id.toString(),
            title: "Career Assessment Completed",
            date: new Date(a.createdAt).toLocaleDateString(),
            type: "assessment"
        }));

        res.status(200).json({
            profile,
            stats,
            summary,
            progress,
            activities
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Mengekstrak skor tertinggi dari sebuah assessment.
 * Mendukung berbagai format response AI (match_percentage, match_score, match, score).
 *
 * @param {Object} assessment - Document assessment dari MongoDB
 * @returns {number} Skor tertinggi dalam persen (0-100)
 */
function extractTopScore(assessment) {
    if (!assessment?.aiResult) return 0;

    // Cek format baru (career_recommendations) dan format lama (top_3_recommendations)
    const recs = assessment.aiResult.career_recommendations
        || assessment.aiResult.top_3_recommendations
        || [];

    if (recs.length === 0) return 0;

    const scores = recs.map(r => {
        const raw = Number(r.match_percentage || r.match_score || r.match || r.score || 0);
        // Jika nilainya desimal (0-1), kalikan 100
        return raw <= 1 ? Math.round(raw * 100) : Math.round(raw);
    });

    return Math.max(...scores);
}

/**
 * Menghitung total skill unik dari semua assessment user.
 *
 * @param {Array} assessments - Array document assessment
 * @returns {number} Jumlah skill unik
 */
function countUserSkills(assessments) {
    const allSkills = new Set();
    assessments.forEach(a => {
        (a.skills?.hardSkills || []).forEach(s => allSkills.add(s));
        (a.skills?.softSkills || []).forEach(s => allSkills.add(s));
    });
    return allSkills.size;
}

/**
 * GET /api/cv-result
 * Mengambil data ATS CV berdasarkan assessment terbaru user.
 */
exports.getCVResult = async (req, res, next) => {
    try {
        const latestAssessment = await Assessment.findOne({ userId: req.userId })
            .sort({ createdAt: -1 });

        if (!latestAssessment) {
            return res.status(404).json({ message: "Belum ada data assessment untuk akun ini. Silakan ikuti assessment terlebih dahulu." });
        }

        const { buildAtsCvFromProfile } = require("../utils/aiTransformer");

        let cvData = {};
        if (latestAssessment.aiResult) {
            cvData = latestAssessment.aiResult.ats_cv || buildAtsCvFromProfile(latestAssessment);
        } else {
            cvData = buildAtsCvFromProfile(latestAssessment);
        }

        res.status(200).json(cvData);
    } catch (error) {
        next(error);
    }
};

/**
 * Mengubah huruf pertama setiap kata menjadi kapital.
 */
function capitalize(str) {
    if (!str) return "";
    return str.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

