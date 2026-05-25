const express = require("express");
const router = express.Router();

const assessmentRoutes = require("./assessmentRoutes");
const skillRoutes = require("./skillRoutes");
const recommendationRoutes = require("./recommendationRoutes");
const authRoutes = require("./authRoutes");
const analysisRoutes = require("./analysisRoutes");
const profileRoutes = require("./profileRoutes");

router.get("/test", (req, res) => {
    res.json({ message: "API working" });
});

router.use("/assessment", assessmentRoutes);
router.use("/skills", skillRoutes);
router.use("/recommendation", recommendationRoutes);
router.use("/auth", authRoutes);
router.use("/analysis", analysisRoutes);
router.use("/profile", profileRoutes);

module.exports = router;