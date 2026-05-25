// src/controllers/analysisController.js
const Assessment = require("../models/Assessment");

const getAnalysisStatus = async (req, res, next) => {
    try {
       

        const latestAssessment = await Assessment.findOne({ userId: req.userId })
            .sort({ createdAt: -1 });

        if (!latestAssessment) {
            return res.status(404).json({ message: "No assessment found for this user" });
        }

        // Dummy return, since AI is already processed in createAssessment
        res.status(200).json({ status: "completed" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAnalysisStatus
};
