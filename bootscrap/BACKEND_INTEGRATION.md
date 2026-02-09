# 🔄 Multi-User Backend Integration Guide

## 📌 Overview

Aplikasi IPK Tracker sekarang support dua mode:

### 1️⃣ **LocalStorage Mode** (Default - Sudah Aktif)
- Data tersimpan di browser user
- Tidak perlu backend
- Cocok untuk: personal use, demo, testing
- ✅ Sudah berjalan sekarang

### 2️⃣ **API Mode** (Multi-User - Perlu Setup Backend)
- Data tersimpan di database cloud
- Multi-user dengan authentication
- Cocok untuk: production, multi-user app
- 🔧 Perlu setup backend dulu

---

## 🚀 Quick Start - Backend Setup

### Prerequisites
```bash
# Install Node.js (v18+)
https://nodejs.org/

# Install MongoDB atau pakai MongoDB Atlas (cloud)
https://www.mongodb.com/
```

### 1. Setup Backend

```bash
# Masuk ke folder backend
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file (pakai text editor)
# Minimal yg perlu diubah:
# - MONGODB_URI (connection string MongoDB)
# - JWT_SECRET (random string untuk security)
```

### 2. Start MongoDB

**Opsi A: MongoDB Lokal**
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

**Opsi B: MongoDB Atlas (Recommended)**
1. Daftar gratis di https://www.mongodb.com/cloud/atlas
2. Buat cluster gratis (M0 Sandbox)
3. Get connection string
4. Update `MONGODB_URI` di `.env`

### 3. Run Backend

```bash
# Development mode
npm run dev

# Server jalan di http://localhost:5000
```

### 4. Test Backend

```bash
# Health check
curl http://localhost:5000/api/health

# Kalau sukses, response:
# {"status":"OK","message":"Server is running"}
```

---

## 🔧 Frontend Integration

### Setup Environment Variable

```bash
# Di root project (folder bootscrap)
cp .env.example .env
```

File `.env` sudah berisi:
```env
VITE_API_URL=http://localhost:5000/api
```

### Install Axios

```bash
# Di root project
npm install axios
```

### Switch ke API Mode

API service sudah tersedia di `src/services/api.ts` dengan fungsi:

**Authentication:**
- `authService.signup(userData)` - Register user baru
- `authService.signin(email, password)` - Login
- `authService.logout()` - Logout

**User Management:**
- `userService.getProfile()` - Get user data
- `userService.updateProfile(data)` - Update nama/prodi
- `userService.updateAcademic(data)` - Update IPK/semester

**Semester History:**
- `semesterService.getHistory()` - Get semua history
- `semesterService.updateSemester(...)` - Update semester baru

---

## 📝 Updated Data Structure

### User Data (Old vs New)

**Old Structure (localStorage only):**
```javascript
{
  namaLengkap: "John Doe",
  nim: "123456",
  programStudi: "TI",
  semesterAktif: 5,
  ipkSaatIni: 3.45,  // ❌ REMOVED
  targetIpk: 3.80,
  totalSks: 120
}
```

**New Structure (dengan IPK Lokal & Utama):**
```javascript
{
  namaLengkap: "John Doe",
  nim: "123456",
  programStudi: "TI",
  semesterAktif: 5,
  ipkLokal: 3.50,    // ✅ NEW - IPK Program Studi
  ipkUtama: 3.45,    // ✅ NEW - IPK Universitas
  targetIpk: 3.80,
  totalSks: 120
}
```

---

## 🔀 Migration Path

### Fase 1: LocalStorage (Current) ✅
- Aplikasi pakai localStorage
- Setiap user input sendiri
- Data tidak sync antar device

### Fase 2: Hybrid (Recommended Next)
1. Backend sudah jalan di background
2. Frontend masih pakai localStorage
3. Bisa switch ke API mode kapan saja
4. User lama tetap bisa pakai localStorage

### Fase 3: Full API Mode
1. Semua data ke backend
2. Login required
3. Data sync antar device
4. Bisa deploy ke production

---

## 🎯 Component Updates Needed

### Components yang perlu update untuk support ipkLokal & ipkUtama:

#### 1. **IpkMetrics.vue**
Sekarang masih pakai `ipkSaatIni`, perlu update ke `ipkLokal` dan `ipkUtama`

**Option A: Tampilkan keduanya**
```vue
<div class="metric-card">
  <h3>IPK Lokal (Prodi)</h3>
  <p>{{ userData.ipkLokal }}</p>
</div>
<div class="metric-card">
  <h3>IPK Utama (Universitas)</h3>
  <p>{{ userData.ipkUtama }}</p>
</div>
```

**Option B: Selector**
```vue
<select v-model="selectedIpkType">
  <option value="lokal">IPK Lokal</option>
  <option value="utama">IPK Utama</option>
</select>
<p>{{ selectedIpkType === 'lokal' ? userData.ipkLokal : userData.ipkUtama }}</p>
```

#### 2. **IpkProgress.vue**
Update untuk pilih mana IPK yang ditampilkan di radial chart

#### 3. **SemesterUpdateModal.vue**
Update untuk input kedua IPK saat update semester:
```vue
<input v-model="newIpkLokal" type="number" />
<input v-model="newIpkUtama" type="number" />
```

#### 4. **ManualSemesterUpdate.vue**
Display both IPKs di current info dan history

---

## 🚢 Deployment Guide

### Backend Deployment (Railway - Free)

```bash
# 1. Push backend ke GitHub
git add backend/
git commit -m "Add backend"
git push

# 2. Buka Railway.app
# 3. Connect GitHub repo
# 4. Add PostgreSQL/MongoDB plugin
# 5. Set environment variables
# 6. Deploy!
```

Railway auto-assign URL: `https://your-app.railway.app`

### Frontend Deployment (GitHub Pages)

```bash
# Update .env untuk production
VITE_API_URL=https://your-app.railway.app/api

# Build
npm run build

# Deploy ke GitHub Pages (existing process)
```

### Vercel Alternative (Frontend)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production
vercel --prod
```

---

## 🧪 Testing Flow

### Test LocalStorage Mode (Current)
1. Buka app
2. OnboardingWizard muncul
3. Isi data dengan IPK Lokal & Utama
4. Data tersimpan di localStorage
5. Browser lain = data kosong

### Test API Mode (After Backend Setup)
1. Backend running di localhost:5000
2. Frontend connect ke backend
3. Signup dengan email + password
4. Data masuk ke MongoDB
5. Login dari browser lain = data sama!

---

## 📊 Database vs LocalStorage Comparison

| Feature | LocalStorage | Database (API) |
|---------|-------------|----------------|
| Setup | ✅ Instant | ⏱️ Perlu backend |
| Cost | 💰 Free | 💰 Free tier available |
| Multi-device | ❌ No | ✅ Yes |
| Multi-user | ❌ No | ✅ Yes |
| Data persistence | 🔒 Browser only | ☁️ Cloud |
| Security | ⚠️ Client-side | 🔐 Server-side |
| Scalability | ❌ Limited | ✅ Unlimited |

---

## 🔐 Security Notes

### LocalStorage Mode
- Data visible di browser DevTools
- Tidak ada authentication
- OK untuk personal use
- ⚠️ Tidak aman untuk data sensitif

### API Mode
- Password di-hash (bcrypt)
- JWT token authentication
- HTTPS di production
- ✅ Production-ready security

---

## 🆘 Troubleshooting

### "Cannot connect to backend"
```bash
# Check backend running
curl http://localhost:5000/api/health

# Check VITE_API_URL di .env
# Check CORS settings di backend
```

### "MongoDB connection failed"
```bash
# Check MongoDB service
# Windows: net start MongoDB
# Linux: sudo systemctl status mongod

# Check MONGODB_URI di backend/.env
```

### "Token expired"
- Default token expire: 30 hari
- Logout & login ulang
- Check JWT_SECRET di backend/.env

---

## 📚 API Documentation

Full API docs tersedia di: `backend/README.md`

### Quick Reference

**Signup:**
```bash
POST /api/auth/signup
Body: { email, password, namaLengkap, nim, ... }
```

**Login:**
```bash
POST /api/auth/signin
Body: { email, password }
```

**Get Profile:**
```bash
GET /api/user/profile
Headers: { Authorization: "Bearer <token>" }
```

**Update Semester:**
```bash
POST /api/semester/update
Headers: { Authorization: "Bearer <token>" }
Body: { semester, ipkLokal, ipkUtama }
```

---

## ✅ Next Steps

### Immediate (LocalStorage dengan IPK baru)
- [x] OnboardingWizard updated dengan ipkLokal & ipkUtama
- [ ] Update IpkMetrics untuk display kedua IPK
- [ ] Update IpkProgress pilih mana IPK yang ditrack
- [ ] Update SemesterUpdateModal input kedua IPK
- [ ] Test flow lengkap

### Future (API Integration)
- [ ] Setup backend lokal
- [ ] Test API endpoints
- [ ] Integrate signup/signin dengan API
- [ ] Update components pakai API service
- [ ] Deploy backend (Railway/Render)
- [ ] Deploy frontend (GitHub Pages/Vercel)
- [ ] Test production flow

---

## 💡 Recommendations

**Untuk Development/Demo:**
- Pakai LocalStorage mode dulu ✅
- Focus polish UI/UX
- Test semua fitur
- Deploy ke GitHub Pages

**Untuk Production/Real Users:**
- Setup backend ASAP
- Deploy ke Railway (free tier)
- Use MongoDB Atlas (free tier)
- Enable HTTPS
- Add monitoring

---

## 📞 Support

**Backend Issues:**
- Check `backend/README.md`
- MongoDB logs
- Server console logs

**Frontend Issues:**
- Browser console
- Network tab
- localStorage inspection

**API Connection:**
- Check CORS settings
- Verify API_URL
- Test with Postman first
