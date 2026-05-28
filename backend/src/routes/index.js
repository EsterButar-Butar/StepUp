const express = require("express");
const router = express.Router();

const assessmentRoutes = require("./assessmentRoutes");

const recommendationRoutes = require("./recommendationRoutes");
const authRoutes = require("./authRoutes");
const analysisRoutes = require("./analysisRoutes");
const profileRoutes = require("./profileRoutes");

const authMiddleware = require("../middleware/authMiddleware");
const profileController = require("../controllers/profileController");

router.get("/test", (req, res) => {
    res.json({ message: "API working" });
});

router.use("/assessment", assessmentRoutes);

router.use("/recommendation", recommendationRoutes);
router.use("/auth", authRoutes);
router.use("/analysis", analysisRoutes);
router.use("/profile", profileRoutes);
router.get("/cv-result", authMiddleware, profileController.getCVResult);

module.exports = router;