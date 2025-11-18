require('dotenv').config();
const db = require('./src/config/db');

async function updateTables() {
  try {
    console.log('🔧 Updating tabel review dan materi...');
    
    // Cek kolom review
    const [reviewCols] = await db.query("SHOW COLUMNS FROM review");
    const reviewColNames = reviewCols.map(col => col.Field);
    console.log('Kolom review:', reviewColNames);
    
    // Cek kolom materi  
    const [materiCols] = await db.query("SHOW COLUMNS FROM materi");
    const materiColNames = materiCols.map(col => col.Field);
    console.log('Kolom materi:', materiColNames);
    
    console.log('\n✅ Update selesai!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateTables();
