import api from "../services/api";

const cardColors = [
    {
        bg: "#dbeafe",
        badgeBg: "#eff6ff",
        text: "#2563eb",
    },
    {
        bg: "#dcfce7",
        badgeBg: "#f0fdf4",
        text: "#16a34a",
    },
    {
        bg: "#fef3c7",
        badgeBg: "#fffbeb",
        text: "#d97706",
    },
];

export const normalizeRecommendationResult = (data, assessmentId) => {
    const recommendations = Array.isArray(data?.career_recommendations)
        ? data.career_recommendations
        : [];

    const normalizedRecommendations = recommendations.map((career, index) => {
        const match = Number(career.match ?? career.score ?? 0);

        return {
            ...career,
            careerId: career.careerId || career.id || assessmentId,
            title: career.title || "Career Recommendation",
            match,
            score: Number(career.score ?? match),
            matchScore: match,
            description: career.description || "",
            readiness: career.readiness || "Moderate",
            progress: Number(career.progress ?? match),
            color: career.color || cardColors[index % cardColors.length],
        };
    });

    const skillGapDetailed = data?.skill_gap_detailed || {};

    return {
        ...data,
        assessmentId: data?.assessment_data?._id || assessmentId,
        career_recommendations: normalizedRecommendations,
        skill_gap_detailed: {
            tech: {
                type: "tech",
                title: "Tech Skills",
                have: skillGapDetailed.tech?.have || [],
                improve: skillGapDetailed.tech?.improve || [],
            },
            soft: {
                type: "soft",
                title: "Soft Skills",
                have: skillGapDetailed.soft?.have || [],
                improve: skillGapDetailed.soft?.improve || [],
            },
        },
        match_breakdown: Array.isArray(data?.match_breakdown)
            ? data.match_breakdown
            : [],
        skill_gap: data?.skill_gap || null,
    };
};

export const getAssessmentResult = async (assessmentId) => {
    if (!assessmentId) {
        throw new Error("Assessment ID is required to load recommendations");
    }

    const response = await api.get(`/recommendation/${assessmentId}`);

    return normalizeRecommendationResult(response.data, assessmentId);
};
