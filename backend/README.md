# EduTour CMS Backend

Backend API untuk aplikasi EduTour CMS - sistem manajemen destinasi wisata edukasi.

## 🚀 Deploy ke Railway

### 1. Push Backend ke GitHub

```bash
cd backend
git add .
git commit -m "Prepare backend for Railway deployment"
git push origin main
```

### 2. Deploy di Railway.app

1. Buka **[Railway.app](https://railway.app/)**
2. Login dengan GitHub
3. Klik **"New Project"** → **"Deploy from GitHub repo"**
4. Pilih repository: `edutour_cms`
5. Pilih **"Add variables"** dan isi:

```env
DB_HOST=your_railway_mysql_host
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=railway
DB_PORT=3306
PORT=7777
JWT_SECRET=edutour_secret_key_2024_very_secure_random_string
NODE_ENV=production
```

6. Railway akan otomatis build dan deploy
7. Ambil URL production: `https://edutour-cms-backend-production.up.railway.app`

### 3. Setup MySQL di Railway

1. Di project Railway, klik **"New"** → **"Database"** → **"Add MySQL"**
2. Copy credentials MySQL yang diberikan Railway
3. Update environment variables backend dengan credentials MySQL
4. Database akan otomatis ter-create oleh `initDB.js`

### 4. Update Frontend API URL

Setelah backend deploy, update file `frontend/src/services/api.js`:

```javascript
const BASE_URL = 'https://edutour-cms-backend-production.up.railway.app/api';
```

Rebuild dan redeploy frontend:

```bash
cd frontend
npm run build
copy dist to docs
git push origin main
```

## 🔧 Teknologi

- **Node.js** + Express
- **MySQL** Database
- **JWT** Authentication
- **Multer** File Upload
- **Railway** Hosting

## 📝 API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/user/register` - User register
- `POST /api/user/login` - User login

### Destinasi
- `GET /api/destinasi` - Get all destinasi
- `POST /api/destinasi` - Create destinasi (Admin only)
- `PUT /api/destinasi/:id` - Update destinasi (Admin only)
- `DELETE /api/destinasi/:id` - Delete destinasi (Admin only)

### Materi
- `GET /api/materi?destinasi_id=:id` - Get materi by destinasi
- `POST /api/materi` - Create materi (Admin only)
- `PUT /api/materi/:id` - Update materi (Admin only)
- `DELETE /api/materi/:id` - Delete materi (Admin only)

### Review
- `GET /api/review?destinasi_id=:id` - Get reviews by destinasi
- `POST /api/review` - Create review (User only)
- `DELETE /api/review/:id` - Delete review (Admin only)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (Admin only)

### Users
- `GET /api/user` - Get all users (Admin only)
- `DELETE /api/user/:id` - Delete user (Admin only)

## 👤 Default Admin

```
Email: admin@edutour.com
Password: EduTour@2024#Secure
```

⚠️ **PENTING:** Ganti password setelah login pertama kali untuk keamanan!

## 📦 Local Development

```bash
npm install
cp .env.example .env
# Edit .env dengan database credentials
npm run setup  # Init DB dan create admin
npm run dev    # Start development server
```

## 🌐 Production

Backend deployed di: `https://edutour-cms-backend-production.up.railway.app`
Frontend deployed di: `https://sholl08.github.io/edutour_cms/`
