const Destinasi = require('../models/destinasiModel');
const jwt = require('jsonwebtoken');

// Tambah Destinasi
exports.tambahDestinasi = async (req, res) => {
  try {
    const { nama_destinasi, deskripsi, lokasi, latitude, longitude } = req.body;

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
      lokasi,
      latitude: parseFloat(latitude) || 0,
      longitude: parseFloat(longitude) || 0,
      gambar: req.file ? req.file.filename : null,
      created_by
    };

    await Destinasi.tambah(data);
    res.status(201).json({ message: 'Destinasi berhasil ditambahkan', data });
  } catch (err) {
    console.error('Error tambah destinasi:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update Destinasi
exports.updateDestinasi = async (req, res) => {
  try {
    const { nama_destinasi, deskripsi, lokasi, latitude, longitude } = req.body;
    const data = {
      nama_destinasi,
      deskripsi,
      lokasi,
      latitude: parseFloat(latitude) || 0,
      longitude: parseFloat(longitude) || 0,
      gambar: req.file ? req.file.filename : req.body.gambar
    };

    await Destinasi.update(req.params.id, data);
    res.status(200).json({ message: 'Destinasi berhasil diupdate', data });
  } catch (err) {
    console.error('Error update destinasi:', err);
    res.status(500).json({ error: err.message });
  }
};

// Hapus Destinasi
exports.hapusDestinasi = async (req, res) => {
  try {
    await Destinasi.hapus(req.params.id);
    res.status(200).json({ message: 'Destinasi berhasil dihapus' });
  } catch (err) {
    console.error('Error hapus destinasi:', err);
    res.status(500).json({ error: err.message });
  }
};

// Ambil semua Destinasi
exports.getAllDestinasi = async (req, res) => {
  try {
    const [destinasi] = await Destinasi.getAll();
    res.status(200).json(destinasi);
  } catch (err) {
    console.error('Error ambil semua destinasi:', err);
    res.status(500).json({ error: err.message });
  }
};

// Ambil detail Destinasi
exports.getDetailDestinasi = async (req, res) => {
  try {
    const [destinasi] = await Destinasi.getById(req.params.id);
    if (!destinasi || destinasi.length === 0) {
      return res.status(404).json({ message: 'Destinasi tidak ditemukan' });
    }
    res.status(200).json({ data: destinasi[0] });
  } catch (err) {
    console.error('Error ambil detail destinasi:', err);
    res.status(500).json({ error: err.message });
  }
};