const Materi = require('../models/materiModel');
const path = require('path');
const fs = require('fs');

// Ambil materi berdasarkan ID destinasi
exports.getMateriByDestinasi = async (req, res) => {
  try {
    const { destinasiId } = req.params;
    const results = await Materi.getByDestinasi(destinasiId);
    res.status(200).json(results);
  } catch (err) {
    console.error('Gagal mengambil materi destinasi:', err);
    res.status(500).json({ success: false, message: 'Gagal mengambil materi destinasi' });
  }
};

// Ambil single materi by ID
exports.getMateriById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Materi.getById(id);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Materi tidak ditemukan' });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error('Gagal mengambil materi:', err);
    res.status(500).json({ success: false, message: 'Gagal mengambil materi' });
  }
};

// Ambil semua materi
exports.getAllMateri = async (req, res) => {
  try {
    const results = await Materi.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Gagal mengambil semua materi:', err);
    res.status(500).json({ success: false, message: 'Gagal mengambil materi' });
  }
};

// Tambah materi baru
exports.createMateri = async (req, res) => {
  try {
    const { judul, isi, destinasi_id } = req.body;
    let media = null;
    let created_by = null;

    // Extract user ID from token
    if (req.user && req.user.id) {
      created_by = req.user.id;
    }

    if (req.file) {
      media = req.file.filename;
    }

    const insertId = await Materi.create({ destinasi_id, judul, isi, media, created_by });

    res.status(201).json({
      success: true,
      message: 'Materi berhasil ditambahkan',
      data: { id: insertId },
    });
  } catch (err) {
    console.error('Gagal menambah materi:', err);
    res.status(500).json({ success: false, message: 'Gagal menambah materi', error: err.message });
  }
};

// Update materi
exports.updateMateri = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, isi } = req.body;
    
    // Get existing materi
    const existing = await Materi.getById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Materi tidak ditemukan' });
    }

    let media = existing.media;

    // If new file uploaded, delete old file
    if (req.file) {
      if (existing.media) {
        const oldPath = path.join(__dirname, '../../uploads/materi', existing.media);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      media = req.file.filename;
    }

    await Materi.update(id, { judul, isi, media });

    res.status(200).json({ success: true, message: 'Materi berhasil diperbarui' });
  } catch (err) {
    console.error('Gagal memperbarui materi:', err);
    res.status(500).json({ success: false, message: 'Gagal memperbarui materi' });
  }
};

// Hapus materi
exports.deleteMateri = async (req, res) => {
  try {
    const { id } = req.params;

    const materi = await Materi.getById(id);
    if (!materi) {
      return res.status(404).json({ success: false, message: 'Materi tidak ditemukan' });
    }

    if (materi.media) {
      const filePath = path.join(__dirname, '../../uploads/materi', materi.media);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Materi.delete(id);

    res.status(200).json({ success: true, message: 'Materi berhasil dihapus' });
  } catch (err) {
    console.error('Gagal menghapus materi:', err);
    res.status(500).json({ success: false, message: 'Gagal menghapus materi' });
  }
};