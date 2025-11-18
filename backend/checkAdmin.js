const db = require('./src/config/db');

async function checkAdmin() {
  try {
    const [users] = await db.query('SELECT id, nama, email, role FROM users');
    console.log('\n📋 Daftar Users di Database:');
    console.log('=====================================');
    
    if (users.length === 0) {
      console.log('❌ Belum ada user/admin di database');
      console.log('\n🔧 Jalankan: node src/createAdmin.js');
    } else {
      users.forEach((user, index) => {
        console.log(`\n${index + 1}. ${user.nama}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkAdmin();
