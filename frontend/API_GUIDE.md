# API Integration Guide - EduTour CMS

## Base URL
```
http://localhost:7777/api
```

## Authentication

### JWT Token
Semua endpoint yang memerlukan autentikasi harus menyertakan header:
```
Authorization: Bearer <token>
```

Token didapat dari response login dan disimpan di `localStorage`.

## Endpoints

### 🔐 Authentication

#### Register User
```http
POST /user/register
Content-Type: application/json

{
  "nama": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "id_user": 1,
    "nama": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login Admin
```http
POST /admin/login
Content-Type: application/json

{
  "email": "admin@edutour.com",
  "password": "admin123"
}
```

---

### 🗺️ Destinasi

#### Get All Destinasi
```http
GET /destinasi
```

**Response:**
```json
[
  {
    "id_destinasi": 1,
    "nama_destinasi": "Candi Borobudur",
    "deskripsi": "Candi Buddha terbesar di dunia...",
    "lokasi": "Magelang, Jawa Tengah",
    "latitude": -7.607874,
    "longitude": 110.203751,
    "gambar": "borobudur.jpg",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Destinasi by ID
```http
GET /destinasi/:id
```

#### Create Destinasi (Admin Only)
```http
POST /destinasi
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

{
  "nama_destinasi": "Candi Prambanan",
  "deskripsi": "Kompleks candi Hindu terbesar...",
  "lokasi": "Yogyakarta",
  "latitude": -7.752020,
  "longitude": 110.491200,
  "gambar": <file>
}
```

#### Update Destinasi (Admin Only)
```http
PUT /destinasi/:id
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

{
  "nama_destinasi": "Updated Name",
  "deskripsi": "Updated description...",
  "lokasi": "Updated Location",
  "latitude": -7.752020,
  "longitude": 110.491200,
  "gambar": <file> (optional)
}
```

#### Delete Destinasi (Admin Only)
```http
DELETE /destinasi/:id
Authorization: Bearer <admin_token>
```

---

### 📚 Materi

#### Get All Materi
```http
GET /materi
```

**Response:**
```json
[
  {
    "id_materi": 1,
    "id_destinasi": 1,
    "judul": "Sejarah Candi Borobudur",
    "konten": "Candi Borobudur dibangun pada abad ke-8...",
    "gambar": "materi-borobudur.jpg",
    "nama_destinasi": "Candi Borobudur",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Materi by ID
```http
GET /materi/:id
```

#### Get Materi by Destinasi
```http
GET /materi/destinasi/:destinasiId
```

#### Create Materi (Admin Only)
```http
POST /materi
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

{
  "id_destinasi": 1,
  "judul": "Arsitektur Candi Borobudur",
  "konten": "Candi ini memiliki struktur...",
  "gambar": <file>
}
```

#### Update Materi (Admin Only)
```http
PUT /materi/:id
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

{
  "id_destinasi": 1,
  "judul": "Updated Title",
  "konten": "Updated content...",
  "gambar": <file> (optional)
}
```

#### Delete Materi (Admin Only)
```http
DELETE /materi/:id
Authorization: Bearer <admin_token>
```

---

### ⭐ Review

#### Get All Reviews (Admin Only)
```http
GET /review
Authorization: Bearer <admin_token>
```

**Response:**
```json
[
  {
    "id_review": 1,
    "id_user": 5,
    "id_destinasi": 1,
    "rating": 5,
    "komentar": "Tempat yang luar biasa!",
    "nama_user": "John Doe",
    "nama_destinasi": "Candi Borobudur",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Reviews by Destinasi
```http
GET /review/destinasi/:destinasiId
```

#### Create Review (User Only)
```http
POST /review/destinasi/:destinasiId
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "rating": 5,
  "komentar": "Sangat menarik dan edukatif!"
}
```

#### Delete Review (Admin Only)
```http
DELETE /review/:id
Authorization: Bearer <admin_token>
```

---

### 👥 Users (Admin Only)

#### Get All Users
```http
GET /user
Authorization: Bearer <admin_token>
```

**Response:**
```json
[
  {
    "id_user": 1,
    "nama": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Delete User
```http
DELETE /user/:id
Authorization: Bearer <admin_token>
```

---

### 📊 Dashboard (Admin Only)

#### Get Statistics
```http
GET /dashboard/stats
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "totalDestinasi": 10,
  "totalMateri": 25,
  "totalReview": 150,
  "totalUsers": 50
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error",
  "errors": ["Email is required", "Password must be at least 6 characters"]
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Admin only."
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Image Upload

### Accepted Formats
- JPG/JPEG
- PNG
- GIF

### Max File Size
- 5MB (configurable in backend)

### Image URLs
Gambar yang diupload dapat diakses via:
```
http://localhost:7777/uploads/destinasi/<filename>
http://localhost:7777/uploads/materi/<filename>
```

---

## Rate Limiting

Backend mungkin menerapkan rate limiting:
- 100 requests per 15 menit per IP
- Endpoint login: 5 requests per 15 menit per IP

---

## CORS

Backend harus mengizinkan CORS dari:
```
http://localhost:3000
```

Untuk production, tambahkan domain production ke whitelist CORS.

---

## Testing dengan Postman/Thunder Client

### Import Collection
1. Buat request baru untuk setiap endpoint
2. Set Authorization header untuk endpoint yang memerlukan token
3. Untuk upload, gunakan form-data dan pilih file

### Environment Variables
```
BASE_URL=http://localhost:7777/api
TOKEN=<your_token_here>
```

---

## Frontend Integration

Semua endpoint sudah terintegrasi di `src/services/api.js`:

```javascript
import { destinasiService, materiService, reviewService } from '@/services/api';

// Example usage
const fetchData = async () => {
  const destinasi = await destinasiService.getAll();
  console.log(destinasi.data);
};
```

Interceptor otomatis menambahkan token ke setiap request jika tersedia di localStorage.
