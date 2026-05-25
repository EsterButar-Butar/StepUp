const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skillController");

router.get("/", skillController.getAllSkills);
router.post("/seed", skillController.seedSkills);

module.exports = router;