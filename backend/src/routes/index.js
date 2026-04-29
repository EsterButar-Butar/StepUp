const express = require("express");
const router = express.Router();

const assessmentRoutes = require("./assessmentRoutes");
const skillRoutes = require("./skillRoutes");
const recommendationRoutes = require("./recommendationRoutes");

router.get("/test", (req, res) => {
    res.json({ message: "API working" });
});

router.use("/assessment", assessmentRoutes);
router.use("/skills", skillRoutes);
router.use("/recommendation", recommendationRoutes);

module.exports = router;