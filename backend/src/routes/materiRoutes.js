const express = require('express');
const router = express.Router();
const materiController = require('../controllers/materiController');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// Get all materi PUBLIC (untuk user)
router.get('/public', materiController.getAllMateri);

// Get all materi (Admin)
router.get('/', authMiddleware, materiController.getAllMateri);

// Ambil materi berdasarkan destinasi (Public) - harus di atas /:id
router.get('/destinasi/:destinasiId', materiController.getMateriByDestinasi);

// Get single materi by ID
router.get('/:id', materiController.getMateriById);

// Tambah materi baru (Admin)
router.post('/', authMiddleware, upload.single('file'), materiController.createMateri);

// Update materi (Admin)
router.put('/:id', authMiddleware, upload.single('file'), materiController.updateMateri);

// Hapus materi (Admin)
router.delete('/:id', authMiddleware, materiController.deleteMateri);

module.exports = router;