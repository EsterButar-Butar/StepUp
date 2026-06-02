export const mockCareerData = {
    id: 1,
    title: "Software Engineer",
    score: 94,

    breakdown: [
        {
            id: 1,
            type: "technical",
            label: "Technical Skills",
            score: 92,
            color: "#2563eb",
        },
        {
            id: 2,
            type: "interests",
            label: "Interests",
            score: 98,
            color: "#8b5cf6",
        },
    ],

    skillGap: {
        have: [
            {
                id: 1,
                name: "Python",
            },
        ],

        improve: [
            {
                id: 2,
                name: "Docker",
            },
        ],

        missing: [
            {
                id: 3,
                name: "AWS",
            },
        ],
    },

    learningPath: [
        {
            id: 1,
            title: "AWS Fundamentals",
        },
    ],

    benchmark: [
        "Communication",
        "Problem Solving",
    ],
};