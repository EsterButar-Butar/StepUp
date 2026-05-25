const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const assessmentController = require("../controllers/assessmentController");
const { assessmentRules } = require("../middleware/validators");

router.get("/", authMiddleware, assessmentController.getAllAssessments);
router.get("/:id", authMiddleware, assessmentController.getAssessmentById);
router.post("/", authMiddleware, assessmentRules, assessmentController.createAssessment);
router.delete("/:id", authMiddleware, assessmentController.deleteAssessment);

module.exports = router;