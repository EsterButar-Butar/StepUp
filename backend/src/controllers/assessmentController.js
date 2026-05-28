/**
 * Assessment Controller — Mengelola CRUD data assessment dan integrasi dengan AI service.
 *
 * Alur utama createAssessment:
 * 1. Simpan data mentah dari Frontend ke MongoDB
 * 2. Transform data ke format yang diterima AI (via aiTransformer)
 * 3. Kirim ke AI service dan simpan hasilnya
 * 4. Kembalikan response ke Frontend
 */

const Assessment = require("../models/Assessment");
const axios = require("axios");
const { transformToAIPayload } = require("../utils/aiTransformer");

/**
 * GET /api/assessment
 * Mengambil semua assessment milik user yang sedang login (paginated).
 */
exports.getAllAssessments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Tampilkan assessment milik user yang login saja
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

/**
 * GET /api/assessment/:id
 * Mengambil satu assessment berdasarkan ID. Cek kepemilikan user.
 */
exports.getAssessmentById = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id);

        if (!assessment) {
            return res.status(404).json({ message: "Assessment tidak ditemukan" });
        }

        // Cek ownership — assessment dengan userId harus cocok dengan user yang request
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

/**
 * POST /api/assessment
 * Menyimpan assessment baru dan mengirimnya ke AI service untuk dianalisis.
 * Assessment tetap tersimpan di database meskipun AI service gagal dihubungi.
 */
exports.createAssessment = async (req, res) => {
    try {
        const { personalInfo, education, experience, skills } = req.body;

        // Simpan dulu ke DB sebelum panggil AI — data aman meskipun AI down
        const newAssessment = new Assessment({
            userId: req.userId || null,
            personalInfo,
            education,
            experience,
            skills
        });
        const savedAssessment = await newAssessment.save();

        // Transform data MongoDB ke format AI service
        const aiPayload = transformToAIPayload(savedAssessment);

        // Panggil AI service — kalau gagal, assessment tetap tersimpan
        let aiResult = null;
        const aiApiUrl = process.env.AI_API_URL || "http://localhost:8000/predict";

        try {
            console.log("Mengirim data ke AI:", aiApiUrl);
            const aiResponse = await axios.post(aiApiUrl, aiPayload, {
                timeout: 60000 // 60 detik timeout (model AI butuh waktu)
            });
            aiResult = aiResponse.data;
            console.log("AI Response diterima!");

            // Simpan hasil AI ke assessment yang sama
            savedAssessment.aiResult = aiResult;
            await savedAssessment.save();
        } catch (aiError) {
            console.error("Warning: Gagal menghubungi AI service —", aiError.message);
            // Assessment tetap tersimpan tanpa aiResult, bisa di-retry nanti
        }

        res.status(201).json({
            message: "Assessment saved successfully",
            assessmentId: savedAssessment._id,
            data: {
                data: savedAssessment,
                ...savedAssessment.toObject()
            },
            ai_status: aiResult ? "completed" : "pending"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error saving assessment",
            error: error.message
        });
    }
};

/**
 * DELETE /api/assessment/:id
 * Menghapus assessment berdasarkan ID. Cek kepemilikan user.
 */
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
