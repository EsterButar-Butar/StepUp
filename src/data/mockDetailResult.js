// src/data/mockResultDetail.js

export const mockResultDetail = {
    id: 1,

    title: "Software Engineer",

    description:
        "Design, develop, and maintain software systems. Software engineers apply the principles of software engineering to the design, development, maintenance, testing, and evaluation of computer software.",

    matchScore: 94,

    tags: [
        "High Demand",
        "Tech, Finance, Healthcare",
        "Remote Friendly",
    ],

    // =========================
    // MATCH BREAKDOWN
    // =========================
    breakdown: [
        {
            id: 1,
            label: "Technical Skills",
            score: 92,
            color: "#2563eb",
        },

        {
            id: 2,
            label: "Soft Skills",
            score: 92,
            color: "#3b82f6",
        },

        {
            id: 3,
            label: "Interests",
            score: 98,
            color: "#8b5cf6",
        },

        {
            id: 4,
            label: "Experience",
            score: 85,
            color: "#64748b",
        },

        {
            id: 5,
            label: "Academic Alignment",
            score: 100,
            color: "#0f172a",
        },
    ],

    // =========================
    // SKILL GAP ANALYSIS
    // =========================
    skillGap: {
        // TECHNICAL
        technical: {
            have: [
                {
                    id: 1,
                    name: "Python",
                    level: "Advanced",
                },

                {
                    id: 2,
                    name: "Java",
                    level: "Advanced",
                },

                {
                    id: 3,
                    name: "Data Structures",
                    level: "Advanced",
                },

                {
                    id: 4,
                    name: "SQL",
                    level: "Intermediate",
                },
            ],

            improve: [
                {
                    id: 5,
                    name: "System Design",
                    level: "Intermediate",
                },

                {
                    id: 6,
                    name: "React.js",
                    level: "Beginner",
                },

                {
                    id: 7,
                    name: "Git / GitHub",
                    level: "Intermediate",
                },
            ],

            missing: [
                {
                    id: 8,
                    name: "AWS / Cloud",
                },

                {
                    id: 9,
                    name: "Docker",
                },

                {
                    id: 10,
                    name: "CI/CD",
                },
            ],
        },

        // SOFT
        soft: {
            have: [
                {
                    id: 11,
                    name: "Problem Solving",
                    level: "Advanced",
                },
            ],

            improve: [
                {
                    id: 12,
                    name: "Public Speaking",
                    level: "Intermediate",
                },

                {
                    id: 13,
                    name: "Technical Writing",
                    level: "Beginner",
                },

                {
                    id: 14,
                    name: "Leadership",
                    level: "Intermediate",
                },
            ],

            missing: [
                {
                    id: 15,
                    name: "Project Manager",
                },
            ],
        },
    },
};