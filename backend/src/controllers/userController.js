const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
require('dotenv').config();

// Registrasi user baru
exports.register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    const existing = await User.findByEmail(email);
    if (existing) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const userId = await User.create({ nama, email, password });
    res.status(201).json({ message: 'Registrasi berhasil', id: userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal registrasi user' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({ message: 'Password salah' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login berhasil',
      token,
      user: { id: user.id, nama: user.nama, email: user.email, role: 'user' },
    });
  } catch (err) {
    res.status(500).json({ message: 'Gagal login user' });
  }
};

// Admin ambil semua user
exports.getAll = async (req, res) => {
  try {
    const data = await User.getAll();
    res.status(200).json({ message: 'Berhasil ambil semua user', data });
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil data user' });
  }
};

// Admin hapus user
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await User.delete(id);
    res.status(200).json({ message: 'User berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal hapus user' });
  }
};