const db = require('./src/config/db');
const bcrypt = require('bcryptjs');

async function setupAdmin() {
  try {
    console.log('🔧 Memeriksa dan membuat admin...\n');
    
    // Cek admin yang ada
    const [existing] = await db.query('SELECT * FROM users WHERE role = "admin"');
    
    if (existing.length > 0) {
      console.log('✅ Admin sudah ada:');
      existing.forEach(admin => {
        console.log(`   📧 Email: ${admin.email}`);
        console.log(`   👤 Nama: ${admin.nama}`);
      });
      console.log('\n💡 Gunakan kredensial di atas untuk login');
    } else {
      console.log('📝 Membuat admin baru...');
      
      const adminData = {
        nama: 'Administrator',
        email: 'admin@edutour.com',
        password: 'admin123',
        role: 'admin'
      };
      
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      
      await db.query(
        'INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)',
        [adminData.nama, adminData.email, hashedPassword, adminData.role]
      );
      
      console.log('✅ Admin berhasil dibuat!');
      console.log('=====================================');
      console.log('📧 Email:', adminData.email);
      console.log('🔑 Password:', adminData.password);
      console.log('=====================================');
      console.log('⚠️  Silakan login dengan kredensial di atas');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setupAdmin();
