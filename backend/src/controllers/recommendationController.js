const Assessment = require("../models/Assessment");

exports.getRecommendation = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    res.json({
      assessment_data: assessment,

      career_recommendations: [
        {
          title: "Frontend Developer",
          match: 94,
          score: 94,
          level: "Senior",
          description: "Build user interfaces and web applications using modern frameworks.",
          readiness: "High",
          progress: 94,
          category: "technology",
          tags: ["High Demand", "Tech, Finance", "Remote Friendly"],
          reasons: [
            "Strong proficiency in HTML5, CSS3, and JavaScript",
            "Experience with React.js framework",
            "Good understanding of responsive design"
          ]
        },
        {
          title: "UX/UI Designer",
          match: 88,
          score: 88,
          level: "Mid-Level",
          description: "Design intuitive digital experiences focusing on user flow and wireframing.",
          readiness: "Good",
          progress: 88,
          category: "design",
          tags: ["Creative", "Product Teams", "Hybrid"],
          reasons: [
            "Eye for visual design and aesthetics",
            "Understanding of user-centered design principles",
            "Familiar with prototyping tools"
          ]
        },
        {
          title: "Product Manager",
          match: 76,
          score: 76,
          level: "Junior",
          description: "Lead product strategy, coordinate between teams, and drive the product roadmap.",
          readiness: "Moderate",
          progress: 76,
          category: "management",
          tags: ["Leadership", "Strategy", "Cross-functional"],
          reasons: [
            "Good communication and teamwork skills",
            "Analytical thinking ability",
            "Interest in product development lifecycle"
          ]
        }
      ],

      // === DATA UNTUK KOMPONEN SkillGap.jsx (SHARED / result2) ===
      skill_gap: {
        skillsHave: ["Python", "Java", "Data Structures", "SQL", "Problem Solving"],
        skillsImprove: [
          { name: "System Design", level: "Intermediate", progress: 60 },
          { name: "React.js", level: "Beginner", progress: 30 }
        ],
        missingSkills: ["AWS / Cloud", "Docker", "CI/CD Pipelines"]
      },

      // === DATA UNTUK KOMPONEN SkillGap.jsx (RESULT - Tech & Soft terpisah) ===
      skill_gap_detailed: {
        tech: {
          title: "Tech Skills",
          have: [
            { name: "HTML5 & CSS3", level: "Advanced proficiency" },
            { name: "JavaScript (ES6+)", level: "Intermediate proficiency" }
          ],
          improve: [
            { name: "React.js Framework", desc: "Core requirement" },
            { name: "API Integration", desc: "Basic knowledge needed" }
          ]
        },
        soft: {
          title: "Soft Skills",
          have: [
            { name: "Problem Solving", level: "Strong analytical skill" }
          ],
          improve: [
            { name: "Public Speaking", desc: "Needed for stakeholder presentations" },
            { name: "Technical Writing", desc: "Documentation skills" }
          ]
        }
      },

      // === DATA UNTUK KOMPONEN MatchBreakdown.jsx (ResultDetail) ===
      match_breakdown: [
        { label: "Technical Skills", value: 92 },
        { label: "Interests", value: 98 },
        { label: "Experience", value: 85 },
        { label: "Academic Alignment", value: 100 }
      ]
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching recommendation",
      error: error.message
    });
  }
};
