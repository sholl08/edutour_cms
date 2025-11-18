const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Folder penyimpanan file upload
const uploadDir = path.join(__dirname, '../../uploads');

// Buat folder jika belum ada
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Tentukan subfolder berdasarkan baseUrl atau originalUrl
    let subfolder = uploadDir;
    
    if (req.baseUrl.includes('destinasi') || req.originalUrl.includes('destinasi')) {
      subfolder = path.join(uploadDir, 'destinasi');
    } else if (req.baseUrl.includes('materi') || req.originalUrl.includes('materi')) {
      subfolder = path.join(uploadDir, 'materi');
    }
    
    // Buat subfolder jika belum ada
    if (!fs.existsSync(subfolder)) {
      fs.mkdirSync(subfolder, { recursive: true });
    }
    
    cb(null, subfolder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// Filter jenis file (gambar + video + dokumen)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|webm|pdf|doc|docx/;
  const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
  const mimetype = file.mimetype;
  
  if (allowedTypes.test(ext) || 
      mimetype.startsWith('image/') || 
      mimetype.startsWith('video/') ||
      mimetype === 'application/pdf' ||
      mimetype.includes('document')) {
    cb(null, true);
  } else {
    cb(new Error('Tipe file tidak diizinkan! (hanya gambar/video/dokumen)'), false);
  }
};

// Inisialisasi multer
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // maksimal 20MB
  fileFilter,
});

// ✅ Export langsung, agar bisa dipakai: upload.single('gambar')
module.exports = upload;