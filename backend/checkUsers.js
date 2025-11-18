require('dotenv').config();
const db = require('./src/config/db');

async function checkUsers() {
  try {
    console.log('🔧 Checking users table...');
    
    // Check columns
    const [columns] = await db.query('SHOW COLUMNS FROM users');
    console.log('Kolom users:', columns.map(c => c.Field));
    
    // Count all users
    const [allUsers] = await db.query('SELECT COUNT(*) AS total FROM users');
    console.log('\nTotal semua users:', allUsers[0].total);
    
    // Check if role column exists
    const hasRole = columns.some(c => c.Field === 'role');
    if (hasRole) {
      // Count by role
      const [byRole] = await db.query('SELECT role, COUNT(*) AS count FROM users GROUP BY role');
      console.log('Users by role:', byRole);
    } else {
      console.log('⚠️  Kolom role tidak ditemukan di tabel users');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkUsers();
