# EduTour CMS - Frontend

Platform wisata edukasi berbasis web untuk menjelajahi destinasi menarik di Indonesia dengan fitur lengkap untuk admin dan user.

## 🚀 Tech Stack

- **React 18** - Modern JavaScript library
- **Vite 5** - Lightning-fast build tool
- **TailwindCSS 3** - Utility-first CSS framework
- **React Router DOM 6** - Client-side routing
- **Axios** - HTTP client
- **Leaflet.js** - Interactive maps
- **React Icons** - Icon library
- **React Toastify** - Toast notifications
- **SweetAlert2** - Beautiful alerts

## 📋 Prerequisites

Sebelum memulai, pastikan Anda telah menginstal:

- **Node.js** versi 16 atau lebih tinggi
- **npm** atau **yarn**
- **Backend API** berjalan di `http://localhost:7777`

## 🔧 Instalasi

1. **Clone repository atau download project**

2. **Masuk ke direktori frontend**
   ```bash
   cd frontend_new
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Pastikan backend sudah berjalan**
   - Backend harus running di port 7777
   - Database MySQL sudah dikonfigurasi
   - Folder `backend/uploads/destinasi` dan `backend/uploads/materi` sudah ada

## 🎯 Menjalankan Aplikasi

### Development Mode
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:3000`

### Build untuk Production
```bash
npm run build
```
Hasil build ada di folder `dist/`

### Preview Production Build
```bash
npm run preview
```

## 📁 Struktur Project

```
frontend_new/
├── public/                 # Static assets
├── src/
│   ├── api/
│   │   └── api.js         # Service layer & axios config
│   ├── components/
│   │   ├── LoadingSpinner.jsx
│   │   └── ProtectedRoute.jsx
│   ├── layouts/
│   │   ├── AdminLayout.jsx    # Layout untuk admin
│   │   └── UserLayout.jsx     # Layout untuk user
│   ├── pages/
│   │   ├── admin/             # Halaman admin
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DestinasiList.jsx
│   │   │   ├── DestinasiAdd.jsx
│   │   │   ├── DestinasiEdit.jsx
│   │   │   ├── MateriList.jsx
│   │   │   ├── MateriAdd.jsx
│   │   │   ├── MateriEdit.jsx
│   │   │   ├── ReviewList.jsx
│   │   │   └── UserList.jsx
│   │   ├── auth/              # Halaman autentikasi
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   └── user/              # Halaman user
│   │       ├── Home.jsx
│   │       ├── Destinasi.jsx
│   │       ├── DestinasiDetail.jsx
│   │       ├── Materi.jsx
│   │       └── Review.jsx
│   ├── App.jsx               # Root component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🔐 Role & Akses

### Admin
- Login di `/login` dengan memilih "Admin"
- Dashboard dengan statistik
- Kelola Destinasi (CRUD)
- Kelola Materi (CRUD)
- Kelola Review (Read & Delete)
- Kelola Users (Read & Delete)

### User
- Register di `/register`
- Login di `/login` dengan memilih "User"
- Lihat destinasi & detail
- Lihat peta lokasi destinasi
- Baca materi edukasi
- Submit review & rating

## 🌐 API Endpoints

Frontend menggunakan proxy ke `http://localhost:7777/api`:

### Auth
- `POST /user/register` - Register user baru
- `POST /user/login` - Login user
- `POST /admin/login` - Login admin

### Destinasi
- `GET /destinasi` - Get all destinasi
- `GET /destinasi/:id` - Get destinasi by ID
- `POST /destinasi` - Create destinasi (multipart/form-data)
- `PUT /destinasi/:id` - Update destinasi (multipart/form-data)
- `DELETE /destinasi/:id` - Delete destinasi

### Materi
- `GET /materi` - Get all materi
- `GET /materi/:id` - Get materi by ID
- `GET /materi/destinasi/:id` - Get materi by destinasi
- `POST /materi` - Create materi (multipart/form-data)
- `PUT /materi/:id` - Update materi (multipart/form-data)
- `DELETE /materi/:id` - Delete materi

### Review
- `GET /review` - Get all reviews
- `GET /review/destinasi/:id` - Get reviews by destinasi
- `POST /review/destinasi/:id` - Create review
- `DELETE /review/:id` - Delete review

### User & Dashboard
- `GET /user` - Get all users (admin only)
- `DELETE /user/:id` - Delete user (admin only)
- `GET /dashboard/stats` - Get dashboard statistics (admin only)

## 🎨 Fitur Utama

### User Features
✅ Hero section dengan CTA
✅ Browse destinasi dengan search
✅ Detail destinasi dengan peta interaktif (Leaflet)
✅ Lihat materi edukasi per destinasi
✅ Submit review dengan rating bintang
✅ Responsive design untuk mobile & desktop

### Admin Features
✅ Dashboard dengan statistik real-time
✅ CRUD destinasi dengan upload gambar
✅ CRUD materi dengan upload gambar
✅ Manajemen review (hapus review tidak pantas)
✅ Manajemen user (hapus user)
✅ Sidebar navigation
✅ Protected routes dengan JWT

### Technical Features
✅ JWT Authentication dengan interceptors
✅ Role-based routing (admin vs user)
✅ Image upload dengan FormData
✅ Toast notifications untuk feedback
✅ SweetAlert2 untuk konfirmasi delete
✅ Loading states & error handling
✅ Proxy configuration untuk API calls
✅ TailwindCSS dengan custom theme

## 🐛 Troubleshooting

### Port 3000 sudah digunakan
Edit `vite.config.js` dan ubah port:
```js
server: {
  port: 3001,
  // ...
}
```

### Backend tidak terkoneksi
Pastikan:
- Backend running di `http://localhost:7777`
- CORS sudah dikonfigurasi di backend
- Proxy di `vite.config.js` sudah benar

### Gambar tidak muncul
Pastikan:
- Folder `backend/uploads/destinasi/` dan `backend/uploads/materi/` ada
- Gambar sudah terupload dengan benar
- Backend serve static files dari folder uploads

### Leaflet map tidak muncul
Pastikan:
- Import CSS Leaflet di `index.css`: `@import 'leaflet/dist/leaflet.css';`
- Marker icons sudah dikonfigurasi (sudah ada di DestinasiDetail.jsx)

## 📦 Build & Deploy

### Build untuk Production
```bash
npm run build
```

Hasil build ada di folder `dist/`. Upload folder ini ke hosting seperti:
- **Vercel** (recommended untuk Vite)
- **Netlify**
- **GitHub Pages**

### Environment Variables
Jika deploy ke production, buat file `.env`:
```
VITE_API_URL=https://your-backend-api.com/api
```

Dan update `api.js`:
```js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7777/api';
```

## 📝 Catatan Penting

1. **JWT Token** disimpan di `localStorage`
2. **User data** disimpan di `localStorage` sebagai JSON
3. **Image upload** menggunakan `multipart/form-data`
4. **Map coordinates** harus valid (latitude/longitude)
5. **Protected routes** otomatis redirect ke login jika tidak authenticated

## 👤 Default Admin (jika sudah ada di backend)
```
Email: admin@edutour.com
Password: admin123
```

## 🤝 Kontribusi

Silakan fork repository dan buat pull request untuk kontribusi.

## 📄 License

MIT License - bebas digunakan untuk pembelajaran dan pengembangan.

---

**Dibuat dengan ❤️ menggunakan React + Vite + TailwindCSS**
