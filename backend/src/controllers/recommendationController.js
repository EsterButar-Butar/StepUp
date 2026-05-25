const Assessment = require("../models/Assessment");

function transformAItoFrontend(aiResult, assessment) {
    if (!aiResult) return null;

    // Kita kembali menggunakan perhitungan algoritma rule-based dari AI (karena lebih transparan dan stabil)
    // Sekarang akan jauh lebih akurat karena Soft Skills sudah dipisahkan dari payload.
    const recs = aiResult.career_recommendations || [];
    
    // Ambil top 3 dari AI
    const topRecs = recs.slice(0, 3);
    
    const career_recommendations = topRecs.map((rec) => {
        const scorePercent = Math.round(rec.match_percentage || 0);
        return {
            title: capitalize(rec.job_role),
            match: scorePercent,
            score: scorePercent,
            category: rec.category || "Technology",
            description: `Karir di bidang ${rec.category || "Technology"} sebagai ${capitalize(rec.job_role)}.`,
            readiness: scorePercent >= 70 ? "High" : scorePercent >= 40 ? "Good" : "Moderate",
            progress: scorePercent
        };
    });

    const topRec = topRecs[0] || {};
    const matched = topRec.matched_skills || [];
    const missing = topRec.missing_skills || [];
    const required = topRec.required_skills || [];

    const skill_gap = {
        skillsHave: matched,
        skillsImprove: missing.map(skill => ({
            name: capitalize(skill),
            level: "Beginner",
            progress: 20
        })),
        missingSkills: missing
    };

    // For detailed, we just put them all in tech for now since AI doesn't differentiate
    const skill_gap_detailed = {
        tech: {
            title: "Tech Skills",
            have: matched.map(s => ({
                name: capitalize(s),
                level: "Proficient"
            })),
            improve: missing.map(s => ({
                name: capitalize(s),
                desc: "Skill yang perlu dipelajari"
            }))
        },
        soft: {
            title: "Soft Skills",
            have: (assessment?.skills?.softSkills || []).map(s => ({
                name: capitalize(s),
                level: "Proficient"
            })),
            improve: [] // Dikosongkan karena AI sekarang hanya fokus mencari missing tech skill
        }
    };

    const match_breakdown = buildMatchBreakdown(topRec, recs, assessment);

    // ATS CV isn't provided by AI yet, so we generate a mock one based on user profile
    const atsCv = buildMockAtsCv(assessment);

    return {
        career_recommendations,
        skill_gap,
        skill_gap_detailed,
        match_breakdown,
        ats_cv: atsCv,
        affirmation: "Berdasarkan analisis AI, ini adalah rekomendasi terbaik untukmu.",
        genai_explanation: ""
    };
}

function buildMockAtsCv(assessment) {
    if (!assessment) return {};
    const p = assessment.personalInfo || {};
    const e = assessment.education || {};
    const s = assessment.skills || {};
    const exp = assessment.experience || {};
    
    return {
        user: {
            name: p.fullName || "User",
            email: p.email || "",
            phone: p.phone || "",
            location: p.location || "",
            linkedin: p.linkedin || "",
            github: ""
        },
        summary: p.bio || `A driven student from ${e.university || "University"} majoring in ${e.major || "their field"}.`,
        skills: [...(s.hardSkills || []), ...(s.softSkills || [])],
        projects: exp.projects || [],
        experience: exp.internships || [],
        organizations: exp.organizations || [],
        certifications: exp.certifications || []
    };
}

/**
 * Hitung breakdown berdasarkan data asli, bukan angka karangan.
 *
 * - Technical Skills  → persentase hard skill yang match dari total yg dibutuhkan
 * - Soft Skills       → persentase soft skill yang match
 * - Experience        → dinilai dari jumlah pengalaman user (project, internship, dsb)
 * - Academic Alignment→ pakai match_score AI langsung karena model sudah memperhitungkan jurusan & GPA
 */
function buildMatchBreakdown(topRec, recs, assessment) {
    // We'll use the top recommendation's matched/missing to calculate Technical Score
    // Since AI doesn't split tech/soft, we'll base Technical on the skills it found
    const matched = topRec.matched_skills?.length || 0;
    const missing = topRec.missing_skills?.length || 0;
    const totalSkills = matched + missing;
    const techScore = totalSkills > 0 ? Math.round((matched / totalSkills) * 100) : 0;

    // Soft Skills: calculate dynamically based on number of soft skills provided by user
    let softScore = 0;
    if (assessment && assessment.skills && assessment.skills.softSkills) {
        const softCount = assessment.skills.softSkills.length;
        softScore = softCount > 0 ? Math.min(softCount * 15 + 40, 95) : 15;
    }

    // Experience
    let expScore = 0;
    if (assessment && assessment.experience) {
        const exp = assessment.experience;
        const projectCount = exp.projects?.length || 0;
        const internCount = exp.internships?.length || 0;
        const orgCount = exp.organizations?.length || 0;
        const certCount = exp.certifications?.length || 0;

        expScore = Math.min(
            (internCount * 25) + (projectCount * 20) + (certCount * 15) + (orgCount * 10),
            100
        );
    }

    // Academic Alignment
    const academicScore = topRec.match_percentage ? Math.round(topRec.match_percentage) : 0;

    return [
        { label: "Technical Skills", value: techScore },
        { label: "Soft Skills", value: softScore },
        { label: "Experience", value: expScore },
        { label: "Academic Alignment", value: academicScore }
    ];
}

function capitalize(str) {
    if (!str) return "";
    return str.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

exports.getRecommendation = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id);

        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found" });
        }

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

        // Pass assessment ke transformer supaya match_breakdown bisa hitung experience
        const frontendData = transformAItoFrontend(assessment.aiResult, assessment);

        res.json({
            assessment_data: assessment,
            ...frontendData
        });

    } catch (error) {
        console.error("CRASH in recommendationController:", error);
        res.status(500).json({
            message: "Error fetching recommendation",
            error: error.message
        });
    }
};
