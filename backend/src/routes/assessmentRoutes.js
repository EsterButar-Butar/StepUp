const express = require("express");
const router = express.Router();
const assessmentController = require("../controllers/assessmentController");

router.get("/", assessmentController.getAllAssessments);
router.post("/", assessmentController.createAssessment);

module.exports = router;