require('dotenv').config();
const db = require('./src/config/db');

const deleteUser = async () => {
  try {
    // Hapus semua user (bukan admin)
    const [result] = await db.query('DELETE FROM users WHERE role = ?', ['user']);
    
    console.log(`✅ Berhasil menghapus ${result.affectedRows} user`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

deleteUser();
