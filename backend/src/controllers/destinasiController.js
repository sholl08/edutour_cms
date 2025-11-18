const Destinasi = require('../models/destinasiModel');
const jwt = require('jsonwebtoken');

// Tambah Destinasi
exports.tambahDestinasi = async (req, res) => {
  try {
    const { nama_destinasi, deskripsi, kategori, lokasi, latitude, longitude } = req.body;

    let created_by = null;
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        created_by = decoded.id;
      } catch (err) {
        console.warn('Token tidak valid, created_by diset null');
      }
    }

    const data = {
      nama_destinasi,
      deskripsi,
      kategori,
      lokasi,
      latitude: parseFloat(latitude) || 0,
      longitude: parseFloat(longitude) || 0,
      gambar: req.file ? req.file.filename : null,
      created_by
    };

    const insertId = await Destinasi.create(data);
    res.status(201).json({ success: true, message: 'Destinasi berhasil ditambahkan', data: { id: insertId, ...data } });
  } catch (err) {
    console.error('Error tambah destinasi:', err);
    res.status(500).json({ success: false, message: 'Gagal menambah destinasi', error: err.message });
  }
};

// Update Destinasi
exports.updateDestinasi = async (req, res) => {
  try {
    const { nama_destinasi, deskripsi, kategori, lokasi, latitude, longitude } = req.body;
    const data = {
      nama_destinasi,
      deskripsi,
      kategori,
      lokasi,
      latitude: parseFloat(latitude) || 0,
      longitude: parseFloat(longitude) || 0,
      gambar: req.file ? req.file.filename : req.body.gambar
    };

    await Destinasi.update(req.params.id, data);
    res.status(200).json({ success: true, message: 'Destinasi berhasil diupdate', data });
  } catch (err) {
    console.error('Error update destinasi:', err);
    res.status(500).json({ success: false, message: 'Gagal update destinasi', error: err.message });
  }
};

// Hapus Destinasi
exports.hapusDestinasi = async (req, res) => {
  try {
    await Destinasi.delete(req.params.id);
    res.status(200).json({ success: true, message: 'Destinasi berhasil dihapus' });
  } catch (err) {
    console.error('Error hapus destinasi:', err);
    res.status(500).json({ success: false, message: 'Gagal hapus destinasi', error: err.message });
  }
};

// Ambil semua Destinasi
exports.getAllDestinasi = async (req, res) => {
  try {
    const destinasi = await Destinasi.getAll();
    res.status(200).json(destinasi);
  } catch (err) {
    console.error('Error ambil semua destinasi:', err);
    res.status(500).json({ success: false, message: 'Gagal ambil destinasi', error: err.message });
  }
};

// Ambil detail Destinasi
exports.getDetailDestinasi = async (req, res) => {
  try {
    const destinasi = await Destinasi.getById(req.params.id);
    if (!destinasi) {
      return res.status(404).json({ success: false, message: 'Destinasi tidak ditemukan' });
    }
    res.status(200).json({ success: true, data: destinasi });
  } catch (err) {
    console.error('Error ambil detail destinasi:', err);
    res.status(500).json({ success: false, message: 'Gagal ambil detail destinasi', error: err.message });
  }
};