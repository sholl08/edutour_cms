# 🚀 Deployment Guide - EduTour CMS

## Prerequisites untuk Production

- Node.js v16+ 
- Backend API sudah deployed
- MySQL database sudah setup

---

## 📦 Build untuk Production

### 1. Update API URL

Buat file `.env` di root project:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

Update `src/services/api.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7777/api';
```

### 2. Build Project

```bash
npm run build
```

Output akan ada di folder `dist/`

### 3. Preview Build Locally

```bash
npm run preview
```

---

## 🌐 Deploy ke Vercel (Recommended)

### Via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login ke Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

### Via Vercel Dashboard

1. Push code ke GitHub
2. Import project di [vercel.com](https://vercel.com)
3. Set Environment Variables:
   - `VITE_API_URL` = `https://your-backend-api.com/api`
4. Deploy

### Vercel Configuration

Buat `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 🚀 Deploy ke Netlify

### Via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login:
```bash
netlify login
```

3. Deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Via Netlify Dashboard

1. Push code ke GitHub
2. Import project di [netlify.com](https://netlify.com)
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Environment Variables:
   - `VITE_API_URL` = `https://your-backend-api.com/api`

### Netlify Configuration

Buat `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🐳 Deploy dengan Docker

### Dockerfile

Buat `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://your-backend:7777;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Build & Run

```bash
docker build -t edutour-frontend .
docker run -p 80:80 edutour-frontend
```

---

## 📱 Deploy ke GitHub Pages

### 1. Install gh-pages

```bash
npm install --save-dev gh-pages
```

### 2. Update package.json

```json
{
  "homepage": "https://yourusername.github.io/edutour-cms",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 3. Update vite.config.js

```javascript
export default defineConfig({
  base: '/edutour-cms/',
  // ... rest of config
})
```

### 4. Deploy

```bash
npm run deploy
```

---

## ☁️ Deploy ke Cloud Platforms

### AWS S3 + CloudFront

1. Build project:
```bash
npm run build
```

2. Upload `dist/` ke S3 bucket
3. Enable static website hosting
4. Setup CloudFront distribution
5. Update CORS di backend untuk CloudFront URL

### Google Cloud Platform

1. Build project
2. Deploy ke Firebase Hosting atau Cloud Storage
3. Setup Cloud CDN jika perlu

### DigitalOcean

1. Create Droplet
2. Install Node.js & Nginx
3. Clone repository
4. Run build
5. Setup Nginx untuk serve static files

---

## 🔐 Environment Variables

### Development (.env.development)
```env
VITE_API_URL=http://localhost:7777/api
```

### Production (.env.production)
```env
VITE_API_URL=https://api.yourdomain.com/api
```

---

## ⚙️ Optimizations untuk Production

### 1. Enable Gzip Compression

Di server (Nginx):
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### 2. Cache-Control Headers

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. Enable HTTP/2

```nginx
listen 443 ssl http2;
```

### 4. Setup SSL

Gunakan Let's Encrypt untuk SSL gratis:
```bash
sudo certbot --nginx -d yourdomain.com
```

---

## 📊 Performance Monitoring

### Google Analytics

Tambahkan di `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### Sentry (Error Tracking)

```bash
npm install @sentry/react @sentry/tracing
```

Setup di `main.jsx`:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Buat `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🐛 Troubleshooting Production

### Blank Page / 404 di Production

1. Pastikan routing SPA dikonfigurasi dengan benar
2. Check `base` di vite.config.js
3. Verify redirects/rewrites di hosting platform

### API Calls Failing

1. Check CORS di backend
2. Verify API_URL environment variable
3. Check network tab di browser DevTools

### Slow Loading

1. Enable code splitting
2. Lazy load routes
3. Optimize images (use WebP)
4. Enable CDN

---

## 📝 Post-Deployment Checklist

- [ ] Test all pages dan fitur
- [ ] Verify login/register works
- [ ] Check image uploads
- [ ] Test admin dashboard
- [ ] Verify map displays correctly
- [ ] Test on mobile devices
- [ ] Check browser console for errors
- [ ] Verify SSL certificate
- [ ] Setup monitoring
- [ ] Configure backups

---

## 🔗 Useful Links

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [React Router Deployment](https://reactrouter.com/en/main/start/tutorial#deploying)

---

**Selamat! Frontend EduTour CMS siap untuk production! 🎉**
