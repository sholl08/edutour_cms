const express = require('express');
const router = express.Router();
const destinasiController = require('../controllers/destinasiController');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Tambah destinasi (dengan upload gambar)
router.post('/', authMiddleware, upload.single('gambar'), destinasiController.tambahDestinasi);

// ✅ Update destinasi (bisa upload gambar baru)
router.put('/:id', authMiddleware, upload.single('gambar'), destinasiController.updateDestinasi);

// ✅ Hapus destinasi
router.delete('/:id', authMiddleware, destinasiController.hapusDestinasi);

// ✅ Ambil semua destinasi
router.get('/', destinasiController.getAllDestinasi);

// ✅ Ambil detail destinasi berdasarkan ID
router.get('/:id', destinasiController.getDetailDestinasi);

module.exports = router;