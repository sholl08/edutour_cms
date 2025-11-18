const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');
const authUserMiddleware = require('../middleware/authUserMiddleware');

// Admin: ambil semua review (tanpa auth check, karena sudah di AdminLayout)
router.get('/', reviewController.getAll);

// Public: ambil review berdasarkan destinasi
router.get('/destinasi/:destinasiId', reviewController.getByDestinasi);

// User: tambah review untuk destinasi tertentu (harus login sebagai user)
router.post('/destinasi/:destinasiId', authUserMiddleware, reviewController.create);

// Admin: hapus review by review ID
router.delete('/:id', authMiddleware, reviewController.delete);

module.exports = router;