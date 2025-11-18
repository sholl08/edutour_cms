require('dotenv').config();
const db = require('./src/config/db');

async function updateDestinasiTable() {
  try {
    console.log('🔧 Updating tabel destinasi...');
    
    // Cek struktur tabel saat ini
    const [columns] = await db.query("SHOW COLUMNS FROM destinasi");
    const existingColumns = columns.map(col => col.Field);
    console.log('Kolom yang ada:', existingColumns);
    
    // Update kolom nama ke nama_destinasi jika perlu
    if (existingColumns.includes('nama') && !existingColumns.includes('nama_destinasi')) {
      await db.query('ALTER TABLE destinasi CHANGE nama nama_destinasi VARCHAR(255) NOT NULL');
      console.log('✅ Kolom nama diubah menjadi nama_destinasi');
    }
    
    // Tambah kolom lokasi jika belum ada
    if (!existingColumns.includes('lokasi')) {
      await db.query('ALTER TABLE destinasi ADD COLUMN lokasi VARCHAR(255) AFTER deskripsi');
      console.log('✅ Kolom lokasi ditambahkan');
    }
    
    // Tambah kolom latitude jika belum ada
    if (!existingColumns.includes('latitude')) {
      await db.query('ALTER TABLE destinasi ADD COLUMN latitude DECIMAL(10, 8) DEFAULT 0 AFTER lokasi');
      console.log('✅ Kolom latitude ditambahkan');
    }
    
    // Tambah kolom longitude jika belum ada
    if (!existingColumns.includes('longitude')) {
      await db.query('ALTER TABLE destinasi ADD COLUMN longitude DECIMAL(11, 8) DEFAULT 0 AFTER latitude');
      console.log('✅ Kolom longitude ditambahkan');
    }
    
    console.log('\n✅ Update tabel destinasi selesai!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateDestinasiTable();
