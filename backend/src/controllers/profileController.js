// src/controllers/profileController.js
const Assessment = require("../models/Assessment");
const User = require("../models/User");

const getProfileData = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const assessments = await Assessment.find({ userId: req.userId }).sort({ createdAt: -1 });

        // Calculate stats
        const totalAssessments = assessments.length;
        
        let latestScore = 0;
        if (totalAssessments > 0) {
            const latest = assessments[0];
            const recommendations = latest.aiResult?.career_recommendations || [];
            if (recommendations.length > 0) {
                // Use the highest match score from the latest assessment's recommendations
                latestScore = Math.max(...recommendations.map(r => Number(r.match || r.score || 0)));
            }
        }

        const stats = {
            totalAssessments,
            latestScore
        };

        const summary = {
            totalSkills: 0, // Placeholder, can be calculated based on user's skills
            completedAssessments: totalAssessments,
            learningHours: 0 // Placeholder
        };

        const progress = {
            labels: assessments.slice(0, 5).reverse().map(a => new Date(a.createdAt).toLocaleDateString()),
            data: assessments.slice(0, 5).reverse().map(a => {
                const recs = a.aiResult?.career_recommendations || [];
                return recs.length > 0 ? Math.max(...recs.map(r => Number(r.match || r.score || 0))) : 0;
            })
        };

        const activities = assessments.slice(0, 5).map(a => ({
            id: a._id.toString(),
            title: "Career Assessment Completed",
            date: new Date(a.createdAt).toLocaleDateString(),
            type: "assessment"
        }));

        res.status(200).json({
            profile: {
                name: user.name,
                email: user.email,
                avatarUrl: "" // Add avatar URL if available
            },
            stats,
            summary,
            progress,
            activities
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProfileData
};
