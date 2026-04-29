const express = require("express");
const router = express.Router();

const Assessment = require("../models/Assessment");

router.get("/", async (req, res) => {
    try {
        const assessments = await Assessment.find(); // Mengambil semua data dari database
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
});

router.post("/", async (req, res) => {
    try {
        const { major, skills, interests, experience } = req.body;
        
        // Simpan ke database
        const newAssessment = new Assessment({
            major,
            skills,
            interests,
            experience
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
});

module.exports = router;