// Import library yang dibutuhkan
const express = require('express');       
const cors = require('cors');             
require('dotenv').config();               
const db = require('./config/db');        // File koneksi ke MySQL

// Tes apakah .env terbaca
console.log('Database host:', process.env.DB_HOST);

// Inisialisasi aplikasi express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());                 // Baca body JSON
app.use(express.urlencoded({ extended: true })); // Baca form-urlencoded

// Static folder untuk upload (gambar destinasi atau materi)
app.use('/uploads', express.static('uploads'));

// Inisialisasi database (buat tabel jika belum ada) - jalankan async
const initDB = require('./config/initDB');
(async () => {
  await initDB();
})();

// Routes
const adminRoutes = require('./routes/adminRoutes');
const destinasiRoutes = require('./routes/destinasiRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const materiRoutes = require('./routes/materiRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/destinasi', destinasiRoutes);
app.use('/api/user', userRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/materi', materiRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Route test
app.get('/', (req, res) => {
  res.send('Backend Edutour CMS berjalan!');
});

// Middleware error global
app.use((err, req, res, next) => {
  console.error('Error middleware:', err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
});

// Jalankan server
const PORT = process.env.PORT || 7777;
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di port ${PORT}`);
  console.log(`🌐 Buka di browser: http://localhost:${PORT}`);
});