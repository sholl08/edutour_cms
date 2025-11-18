const db = require('./config/db');
const bcrypt = require('bcryptjs');

async function createDefaultAdmin() {
  console.log('🔧 Membuat admin default...');

  try {
    // Cek apakah sudah ada admin
    const [admins] = await db.query('SELECT * FROM users WHERE role = "admin" LIMIT 1');
    
    if (admins.length > 0) {
      console.log('ℹ️  Admin sudah ada, skip pembuatan admin default');
      console.log('📧 Email admin:', admins[0].email);
      process.exit(0);
      return;
    }

    // Buat admin default
    const defaultAdmin = {
      nama: 'Administrator',
      email: 'admin@edutour.com',
      password: 'EduTour@2024#Secure',
      role: 'admin'
    };

    const hashedPassword = await bcrypt.hash(defaultAdmin.password, 10);

    await db.query(
      'INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)',
      [defaultAdmin.nama, defaultAdmin.email, hashedPassword, defaultAdmin.role]
    );

    console.log('✅ Admin default berhasil dibuat!');
    console.log('📧 Email:', defaultAdmin.email);
    console.log('🔑 Password:', defaultAdmin.password);
    console.log('⚠️  Harap ubah password setelah login pertama kali!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error saat membuat admin:', error);
    process.exit(1);
  }
}

createDefaultAdmin();
