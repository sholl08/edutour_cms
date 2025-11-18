# EduTour CMS

Sistema de gestión de contenido para destinos turísticos educativos con panel administrativo completo.

## 🌟 Fitur Utama

### Admin Panel
- **Dashboard** - Statistik jumlah destinasi, materi, review, dan users
- **Kelola Destinasi** - CRUD destinasi wisata dengan upload gambar
- **Kelola Materi** - CRUD materi edukasi dengan konten lengkap
- **Kelola Review** - Melihat dan menghapus review dari users
- **Kelola Users** - Melihat dan menghapus user terdaftar

### User Interface
- **Home** - Halaman utama dengan hero section
- **Destinasi** - Daftar destinasi wisata dengan grid card
- **Detail Destinasi** - Peta interaktif, materi terkait, dan review
- **Materi** - Daftar materi edukasi
- **Review** - Form untuk memberikan review destinasi
- **Authentication** - Login dan register untuk user

## 🛠️ Teknologi

### Backend
- Node.js + Express.js
- MySQL Database
- JWT Authentication
- Multer (File Upload)
- bcryptjs (Password Hashing)
- dotenv (Environment Variables)

### Frontend
- React 18.3.1
- Vite 5.4.21
- React Router DOM 6.30.2
- TailwindCSS 3.4.18
- Axios 1.13.2
- React Toastify 9.1.3
- SweetAlert2 11.26.3
- Leaflet.js 1.9.4 (Maps)
- React Icons

## 📋 Prerequisites

- Node.js (v16 atau lebih baru)
- MySQL (v8 atau lebih baru)
- npm atau yarn

## 🚀 Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/edutour_cms.git
cd edutour_cms
```

### 2. Setup Database
```bash
# Buat database MySQL
mysql -u root -p
CREATE DATABASE edutour_db;
exit;
```

### 3. Setup Backend
```bash
cd backend
npm install

# Buat file .env
cp .env.example .env

# Edit .env dengan konfigurasi database Anda
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=yourpassword
# DB_NAME=edutour_db
# JWT_SECRET=your-secret-key-here
# PORT=7777
```

### 4. Setup Frontend
```bash
cd ../frontend
npm install
```

## 🎮 Menjalankan Aplikasi

### Development Mode

**Backend:**
```bash
cd backend
npm start
# Server berjalan di http://localhost:7777
```

**Frontend:**
```bash
cd frontend
npm run dev
# Frontend berjalan di http://localhost:3000
```

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
# Output di folder dist/
```

## 👤 Default Admin Account

Setelah setup database otomatis, gunakan akun ini untuk login:

```
Email: admin@admin.com
Password: admin123
```

## 📁 Struktur Project

```
edutour_cms/
├── backend/
│   ├── src/
│   │   ├── config/          # Database & upload config
│   │   ├── controllers/     # Business logic
│   │   ├── middleware/      # Auth & upload middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   └── server.js        # Entry point
│   ├── uploads/             # File uploads
│   │   ├── destinasi/
│   │   └── materi/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── layouts/         # Layout components
│   │   ├── pages/           # Page components
│   │   │   ├── admin/       # Admin pages
│   │   │   ├── auth/        # Auth pages
│   │   │   └── user/        # User pages
│   │   ├── services/        # API services
│   │   └── App.jsx          # Main app
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/user/register` - User register
- `POST /api/user/login` - User login

### Destinasi
- `GET /api/destinasi` - Get all destinasi
- `GET /api/destinasi/:id` - Get destinasi by ID
- `POST /api/destinasi` - Create destinasi (Admin)
- `PUT /api/destinasi/:id` - Update destinasi (Admin)
- `DELETE /api/destinasi/:id` - Delete destinasi (Admin)

### Materi
- `GET /api/materi/public` - Get all materi (Public)
- `GET /api/materi` - Get all materi (Admin)
- `GET /api/materi/destinasi/:destinasiId` - Get materi by destinasi
- `POST /api/materi` - Create materi (Admin)
- `PUT /api/materi/:id` - Update materi (Admin)
- `DELETE /api/materi/:id` - Delete materi (Admin)

### Review
- `GET /api/review` - Get all review (Admin)
- `GET /api/review/destinasi/:destinasiId` - Get review by destinasi
- `POST /api/review/destinasi/:destinasiId` - Create review (User)
- `DELETE /api/review/:id` - Delete review (Admin)

### Dashboard
- `GET /api/dashboard` - Get dashboard stats (Admin)

### User Management
- `GET /api/user` - Get all users (Admin)
- `DELETE /api/user/:id` - Delete user (Admin)

## 🎨 Fitur UI/UX

- **Responsive Design** - Mendukung desktop, tablet, dan mobile
- **Loading Skeletons** - Skeleton screens untuk better UX
- **Toast Notifications** - Real-time feedback (2s auto-close, max 3)
- **Confirmation Dialogs** - SweetAlert2 untuk delete confirmations
- **Interactive Maps** - Leaflet.js dengan custom markers
- **Star Rating System** - 1-5 bintang untuk review
- **Image Upload Preview** - Preview sebelum upload
- **Error Handling** - Placeholder image untuk broken images

## 🔒 Keamanan

- JWT Token Authentication
- Password hashing dengan bcryptjs
- Protected routes dengan middleware
- Role-based access (Admin/User)
- Input validation
- SQL injection prevention

## 📝 License

MIT License

## 👨‍💻 Developer

Dibuat dengan ❤️ untuk project Pemrograman Web

---

**Note:** Pastikan untuk mengubah JWT_SECRET di file .env dengan key yang aman untuk production!
