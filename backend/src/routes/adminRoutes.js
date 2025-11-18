const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// 🔓 Public routes (tidak perlu token)
router.post('/login', adminController.login);
router.post('/register', adminController.create); // Route register

// 🔒 Route di bawah ini hanya bisa diakses kalau sudah login
router.get('/', authMiddleware, adminController.getAll);
router.post('/', authMiddleware, adminController.create);
router.put('/:id', authMiddleware, adminController.update);
router.delete('/:id', authMiddleware, adminController.delete);

module.exports = router;