const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json([
        { id: 1, name: "Communication", category: "Soft Skill" },
        { id: 2, name: "Leadership", category: "Soft Skill" },
        { id: 3, name: "Python", category: "Technical Skill" },
        { id: 4, name: "SQL", category: "Technical Skill" },
        { id: 5, name: "Data Analysis", category: "Technical Skill" },
        { id: 6, name: "Public Speaking", category: "Soft Skill" }
    ]);
});

module.exports = router;