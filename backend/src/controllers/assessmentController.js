const Assessment = require("../models/Assessment");

exports.getAllAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.find();
        res.json({
            message: "Success fetching assessments",
            data: assessments
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching assessments",
            error: error.message
        });
    }
};

exports.createAssessment = async (req, res) => {
    try {
        const { personalInfo, education, experience, skills } = req.body;
        
        const newAssessment = new Assessment({
            personalInfo,
            education,
            experience,
            skills
        });
        
        const savedAssessment = await newAssessment.save();
        
        res.status(201).json({
            message: "Assessment saved successfully",
            data: savedAssessment
        });
    } catch (error) {
        res.status(500).json({
            message: "Error saving assessment",
            error: error.message
        });
    }
};
