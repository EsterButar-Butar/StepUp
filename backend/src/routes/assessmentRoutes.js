const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Assessment route working" });
});

router.post("/", (req, res) => {
    res.json({
        message: "Assessment received successfully",
        data: req.body
    });
});

module.exports = router;