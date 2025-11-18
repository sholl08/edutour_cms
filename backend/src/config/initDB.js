const db = require('./db');

async function initDatabase() {
  console.log('🔧 Memulai inisialisasi database...');

  try {
    // Tabel Users (untuk admin dan user)
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Tabel users berhasil dibuat/sudah ada');

    // Tabel Destinasi
    await db.query(`
      CREATE TABLE IF NOT EXISTS destinasi (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama_destinasi VARCHAR(255) NOT NULL,
        deskripsi TEXT,
        lokasi VARCHAR(255),
        latitude DECIMAL(10, 8) DEFAULT 0,
        longitude DECIMAL(11, 8) DEFAULT 0,
        gambar VARCHAR(255),
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Tabel destinasi berhasil dibuat/sudah ada');

    // Tabel Materi
    await db.query(`
      CREATE TABLE IF NOT EXISTS materi (
        id INT AUTO_INCREMENT PRIMARY KEY,
        destinasi_id INT NOT NULL,
        judul VARCHAR(255) NOT NULL,
        isi TEXT,
        media VARCHAR(255),
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (destinasi_id) REFERENCES destinasi(id) ON DELETE CASCADE,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Tabel materi berhasil dibuat/sudah ada');

    // Tabel Review
    await db.query(`
      CREATE TABLE IF NOT EXISTS review (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        destinasi_id INT NOT NULL,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        komentar TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (destinasi_id) REFERENCES destinasi(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Tabel review berhasil dibuat/sudah ada');

    console.log('\n✨ Inisialisasi database selesai!');
    console.log('📝 Semua tabel berhasil dibuat.');
    
  } catch (error) {
    console.error('❌ Error saat inisialisasi database:', error);
  }
}

// Jangan auto-run, hanya export function
// initDatabase();

module.exports = initDatabase;
