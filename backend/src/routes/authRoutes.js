const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { registerRules, loginRules } = require("../middleware/validators");

router.post("/register", registerRules, authController.register);
router.post("/login", loginRules, authController.login);

module.exports = router;
