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

const axios = require("axios");

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

        // Persiapan nembak API AI
        let aiResult = null;
        try {
            const aiPayload = {
                user_profile: {
                    education: education.major,
                    skills_list: [...skills.hardSkills, ...skills.softSkills],
                }
            };

            const aiApiUrl = process.env.AI_API_URL || "http://TUNGGU_LINK_DARI_TIM_AI/predict";


            // const aiResponse = await axios.post(aiApiUrl, aiPayload);
            // aiResult = aiResponse.data;

            console.log("Mencoba konek ke AI di URL:", aiApiUrl);

        } catch (aiError) {
            console.error("Warning: Gagal menghubungi API AI", aiError.message);
        }

        // Kembalikan respon ke Frontend
        res.status(201).json({
            message: "Assessment saved successfully",
            data: savedAssessment,
            // ai_recommendation: aiResult 
        });
    } catch (error) {
        res.status(500).json({
            message: "Error saving assessment",
            error: error.message
        });
    }
};
