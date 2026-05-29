/**
 * AI Data Transformer — Modul utilitas untuk mengubah format data
 * antara MongoDB (Backend), AI Service (Python/FastAPI), dan Frontend (React).
 *
 * Modul ini berisi dua transformer utama:
 * 1. transformToAIPayload   → MongoDB → AI (input)
 * 2. transformAItoFrontend  → AI (output) → Frontend (React components)
 */

/**
 * Mengubah data assessment dari MongoDB ke format yang diterima AI service.
 * AI service (FastAPI /predict) menerima: { "resume_text": string, "top_k": number }
 *
 * @param {Object} assessment - Document assessment dari MongoDB
 * @returns {Object} Payload siap kirim ke AI endpoint /predict
 */
function transformToAIPayload(assessment) {
    const { personalInfo, education, skills, experience } = assessment;

    const p = personalInfo || {};
    const e = education || {};
    const s = skills || {};
    const exp = experience || {};

    return {
        name: p.fullName || "",
        email: p.email || "",
        phone: p.phone || "",
        linkedin: p.linkedin || "",
        location: p.location || "",
        major: e.major || "",
        education: e.university || "",
        semester: Number(e.semester) || 0,
        gpa: Number(e.gpa) || 0.0,
        hard_skills: s.hardSkills || [],
        soft_skills: s.softSkills || [],
        projects: (exp.projects || []).map(p => 
            `${p.projectName || ""} (${p.role || ""}): ${p.description || ""} ${p.issuesSolved || ""}`.trim()
        ),
        internships: (exp.internships || []).map(i => 
            `${i.position || ""} at ${i.company || ""} (${i.duration || ""}): ${i.responsibilities || ""}`.trim()
        ),
        organizations: (exp.organizations || []).map(o => 
            `${o.role || ""} at ${o.organizationName || ""} (${o.duration || ""})`.trim()
        ),
        certifications: (exp.certifications || []).map(c => 
            `${c.certificateName || ""} from ${c.issuer || ""} (${c.year || ""})`.trim()
        )
    };
}

/**
 * Mengubah response dari AI service ke format yang dibutuhkan komponen React di Frontend.
 * Mendukung dua format AI response (lama dan baru) sebagai fallback.
 *
 * @param {Object} aiResult - Raw response dari AI service
 * @param {Object} assessment - Document assessment dari MongoDB (untuk data tambahan)
 * @returns {Object|null} Data siap render di Frontend, atau null jika aiResult kosong
 */
function transformAItoFrontend(aiResult, assessment, selectedIndex = 0) {
    if (!aiResult) return null;

    // Dukung kedua format response AI:
    // Format A (baru): aiResult.career_recommendations (sudah dinormalisasi oleh AI)
    // Format B (lama): aiResult.top_3_recommendations (format raw dari model)
    const recs = aiResult.career_recommendations || aiResult.top_3_recommendations || [];
    const topRecs = [...recs.slice(0, 3)];

    // Pindahkan karir terpilih ke index 0 agar dapat dibaca di halaman detail
    if (selectedIndex > 0 && selectedIndex < topRecs.length) {
        const selectedRec = topRecs[selectedIndex];
        topRecs.splice(selectedIndex, 1);
        topRecs.unshift(selectedRec);
    }

    // Mapping career recommendations ke format komponen TopMatchesGrid di Frontend
    const career_recommendations = topRecs.map((rec, index) => {
        // Format A: match_percentage (integer). Format B: match_score (desimal 0-1)
        const rawScore = rec.match_percentage || rec.match_score || 0;
        const scorePercent = rawScore <= 1 ? Math.round(rawScore * 100) : Math.round(rawScore);

        return {
            careerId: `${assessment._id}_${index}`, // ID unik untuk detail page routing
            title: capitalize(rec.job_role || rec.title || ""),
            match: scorePercent,
            score: scorePercent,
            category: rec.category || "",
            description: "",
            readiness: scorePercent >= 70 ? "High" : scorePercent >= 40 ? "Good" : "Moderate",
            progress: scorePercent
        };
    });

    // Ambil skill gap dari recommendation pertama ATAU dari objek skill_gap global
    const topRec = topRecs[0] || {};
    const globalSkillGap = aiResult.skill_gap || {};

    // Format A: matched_skills/missing_skills langsung di rec
    // Format B: skill_gap.hard_skill_gap.matched / skill_gap.soft_skill_gap.matched
    const hardMatched = topRec.matched_skills || globalSkillGap.hard_skill_gap?.matched || [];
    const hardMissing = topRec.missing_skills || globalSkillGap.hard_skill_gap?.missing || [];
    const softMatched = globalSkillGap.soft_skill_gap?.matched || [];
    const softMissing = globalSkillGap.soft_skill_gap?.missing || [];

    const allMatched = [...new Set([...hardMatched, ...softMatched])];
    const allMissing = [...new Set([...hardMissing, ...softMissing])];

    // Mapping ke format komponen SkillGap di Frontend
    const skill_gap = {
        skillsHave: allMatched,
        skillsImprove: allMissing.map(skill => ({
            name: capitalize(skill),
            level: "Beginner",
            progress: 20
        })),
        missingSkills: allMissing
    };

    // Mapping ke format komponen SkillGapDetailed di Frontend
    const skill_gap_detailed = {
        tech: {
            title: "Tech Skills",
            have: hardMatched.map(s => ({
                name: capitalize(s),
                level: "Proficient"
            })),
            improve: hardMissing.map(s => ({
                name: capitalize(s),
                desc: "Skill yang perlu dipelajari"
            })),
            missing: hardMissing.map(s => ({
                name: capitalize(s)
            }))
        },
        soft: {
            title: "Soft Skills",
            have: (softMatched.length > 0 ? softMatched : assessment?.skills?.softSkills || []).map(s => ({
                name: capitalize(s),
                level: "Proficient"
            })),
            improve: softMissing.map(s => ({
                name: capitalize(s),
                desc: "Perlu ditingkatkan"
            })),
            missing: softMissing.map(s => ({
                name: capitalize(s)
            }))
        }
    };

    // Hitung match breakdown berdasarkan data nyata
    const match_breakdown = buildMatchBreakdown(topRec, recs, assessment, globalSkillGap);

    // Bangun ATS CV — gunakan dari AI jika tersedia, kalau tidak buat dari profil user
    const ats_cv = { ...(aiResult.ats_cv || buildAtsCvFromProfile(assessment)) };
    if (ats_cv.header) {
        ats_cv.header = {
            ...ats_cv.header,
            target_role: capitalize(topRec.job_role || topRec.title || ats_cv.header.target_role || "")
        };
    }

    // Gunakan affirmation dari AI atau buat default
    const affirmation = globalSkillGap.affirmation
        || aiResult.affirmation
        || "Berdasarkan analisis AI, ini adalah rekomendasi terbaik untukmu.";

    return {
        career_recommendations,
        skill_gap,
        skill_gap_detailed,
        match_breakdown,
        ats_cv,
        affirmation,
        genai_explanation: aiResult.genai_explanation || ""
    };
}

/**
 * Menghitung breakdown skor kecocokan berdasarkan data assessment dan hasil AI.
 * Semua angka dihitung dari data nyata, bukan hardcode.
 *
 * @param {Object} topRec - Rekomendasi karir tertinggi dari AI
 * @param {Array} recs - Semua rekomendasi karir dari AI
 * @param {Object} assessment - Document assessment dari MongoDB
 * @param {Object} globalSkillGap - Objek skill_gap dari response AI
 * @returns {Array} Array breakdown: Technical, Soft Skills, Experience, Academic
 */
function buildMatchBreakdown(topRec, recs, assessment, globalSkillGap) {
    // Technical Skills — rasio skill yang match vs total yang dibutuhkan
    const hardMatched = topRec.matched_skills || globalSkillGap?.hard_skill_gap?.matched || [];
    const hardMissing = topRec.missing_skills || globalSkillGap?.hard_skill_gap?.missing || [];
    const totalSkills = hardMatched.length + hardMissing.length;
    const techScore = totalSkills > 0 ? Math.round((hardMatched.length / totalSkills) * 100) : 0;

    // Soft Skills — dihitung dari jumlah soft skills yang dimiliki user
    let softScore = 0;
    if (assessment?.skills?.softSkills) {
        const softCount = assessment.skills.softSkills.length;
        softScore = softCount > 0 ? Math.min(softCount * 15 + 40, 95) : 15;
    }

    // Experience — dihitung dari kuantitas pengalaman user
    let expScore = 0;
    if (assessment?.experience) {
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

    // Academic Alignment — gunakan skor tertinggi dari AI
    const rawAcademic = topRec.match_percentage || topRec.match_score || 0;
    const academicScore = rawAcademic <= 1 ? Math.round(rawAcademic * 100) : Math.round(rawAcademic);

    return [
        { label: "Technical Skills", value: techScore, type: "technical" },
        { label: "Soft Skills", value: softScore, type: "interests" },
        { label: "Experience", value: expScore, type: "experience" },
        { label: "Academic Alignment", value: academicScore, type: "academic" }
    ];
}

/**
 * Membangun data ATS CV dari profil user jika AI belum menyediakan.
 *
 * @param {Object} assessment - Document assessment dari MongoDB
 * @returns {Object} Objek ATS CV siap render di Frontend
 */
function buildAtsCvFromProfile(assessment) {
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
 * Mengubah huruf pertama setiap kata menjadi kapital.
 *
 * @param {string} str - String yang akan di-capitalize
 * @returns {string} String dengan huruf pertama tiap kata menjadi kapital
 */
function capitalize(str) {
    if (!str) return "";
    return str.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

module.exports = {
    transformToAIPayload,
    transformAItoFrontend,
    buildMatchBreakdown,
    buildAtsCvFromProfile,
    capitalize
};
