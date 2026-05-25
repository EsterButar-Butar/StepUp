const express = require('express');
const router = express.Router();
const { getAnalysisStatus } = require('../controllers/analysisController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/status', authMiddleware, getAnalysisStatus);

module.exports = router;
