const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

// Route untuk ambil data statistik dashboard admin
router.get('/stats', authMiddleware, dashboardController.getDashboardStats);

module.exports = router;