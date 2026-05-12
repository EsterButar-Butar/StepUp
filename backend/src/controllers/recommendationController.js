const Assessment = require("../models/Assessment");

exports.getRecommendation = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    res.json({
      assessment_data: assessment,
      extracted_skills: [
        "analysis", "communication", "data analysis", "machine learning",
        "python", "reporting", "sql", "tensorflow"
      ],
      ai_predictions: [
        { job_role: "data scientist", model_confidence: 99.47 }
      ],
      career_recommendations: [
        {
          job_role: "data scientist",
          category: "technology",
          match_percentage: 85.87,
          matched_skills: ["data analysis", "machine learning", "python", "sql", "tensorflow"],
          missing_skills: ["statistics"],
          required_skills: ["data analysis", "machine learning", "python", "sql", "statistics", "tensorflow"]
        }
      ]
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching recommendation",
      error: error.message
    });
  }
};
