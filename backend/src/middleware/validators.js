const { body, validationResult } = require("express-validator");

// Kalau ada validation error, langsung return 400 tanpa lanjut ke controller
function handleValidation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validasi gagal",
            errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
        });
    }
    next();
}

const registerRules = [
    body("name")
        .trim()
        .notEmpty().withMessage("Nama wajib diisi"),
    body("email")
        .trim()
        .isEmail().withMessage("Format email tidak valid")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 8 }).withMessage("Password minimal 8 karakter"),
    handleValidation
];

const loginRules = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email wajib diisi")
        .isEmail().withMessage("Format email tidak valid"),
    body("password")
        .notEmpty().withMessage("Password wajib diisi"),
    handleValidation
];

const assessmentRules = [
    body("personalInfo.fullName")
        .trim()
        .notEmpty().withMessage("Nama lengkap wajib diisi"),
    body("personalInfo.email")
        .trim()
        .isEmail().withMessage("Format email tidak valid"),
    body("education.major")
        .trim()
        .notEmpty().withMessage("Jurusan wajib diisi"),
    body("education.university")
        .trim()
        .notEmpty().withMessage("Universitas wajib diisi"),
    body("skills.hardSkills")
        .isArray({ min: 1 }).withMessage("Minimal 1 hard skill"),
    body("skills.softSkills")
        .isArray({ min: 1 }).withMessage("Minimal 1 soft skill"),
    body("skills.experienceLevel")
        .isIn(["beginner", "intermediate", "advanced"]).withMessage("Experience level tidak valid"),
    handleValidation
];

module.exports = { registerRules, loginRules, assessmentRules };
