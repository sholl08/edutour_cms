const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

// Admin: ambil semua review
router.get('/', authMiddleware, reviewController.getAll);

// Public: ambil review berdasarkan destinasi
router.get('/destinasi/:destinasiId', reviewController.getByDestinasi);

// User: tambah review untuk destinasi tertentu (harus login)
router.post('/destinasi/:destinasiId', authMiddleware, reviewController.create);

// Admin: hapus review by review ID
router.delete('/:id', authMiddleware, reviewController.delete);

module.exports = router;