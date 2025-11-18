const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Register & login user biasa
router.post('/register', userController.register);
router.post('/login', userController.login);

// Admin: kelola user
router.get('/', authMiddleware, userController.getAll);
router.delete('/:id', authMiddleware, userController.delete);

module.exports = router;