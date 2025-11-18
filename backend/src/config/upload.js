const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Pastikan folder upload ada
const uploadDirs = ['uploads/destinasi', 'uploads/materi'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Storage untuk destinasi
const destinasiStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/destinasi/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'destinasi-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Storage untuk materi
const materiStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/materi/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'materi-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filter file type (image dan pdf)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar (JPEG, JPG, PNG, GIF) atau PDF yang diperbolehkan'), false);
  }
};

const uploadDestinasi = multer({ 
  storage: destinasiStorage, 
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

const uploadMateri = multer({ 
  storage: materiStorage, 
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

module.exports = { uploadDestinasi, uploadMateri };