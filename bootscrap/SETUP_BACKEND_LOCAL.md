# 🚀 Setup Backend Local - Panduan Lengkap

Panduan ini akan membantu kamu setup backend secara lokal (tanpa deploy) untuk testing full stack.

---

## 📋 Prerequisites

Sebelum mulai, pastikan sudah install:

- **Node.js** (v16 atau lebih baru) - [Download](https://nodejs.org/)
- **MongoDB** (pilih salah satu):
  - MongoDB Community Server (local) - [Download](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (cloud gratis) - [Sign up](https://www.mongodb.com/cloud/atlas/register)

---

## 🗄️ Opsi 1: MongoDB Atlas (Recommended - Cloud Gratis)

### 1. Buat MongoDB Atlas Cluster (GRATIS)

1. **Sign up** di [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Pilih **FREE Tier (M0)** - gratis selamanya, 512MB storage
3. Pilih **Provider**: AWS atau Google Cloud
4. Pilih **Region**: Singapore (ap-southeast-1) - paling dekat
5. **Cluster Name**: Bisa default atau ganti (contoh: `ipk-tracker-cluster`)
6. Klik **Create**

### 2. Setup Database Access

1. Di sidebar kiri, klik **Database Access**
2. Klik **Add New Database User**
3. Pilih **Password** authentication
4. Username: `ipkadmin` (atau terserah)
5. Password: Buat password kuat (catat di tempat aman!)
6. **Database User Privileges**: pilih **Read and write to any database**
7. Klik **Add User**

### 3. Setup Network Access

1. Di sidebar kiri, klik **Network Access**
2. Klik **Add IP Address**
3. Pilih **Allow Access from Anywhere** (untuk testing local)
4. Klik **Confirm**

⚠️ **Note**: Untuk production, sebaiknya dibatasi IP tertentu. Tapi untuk testing local, allow all dulu.

### 4. Dapatkan Connection String

1. Kembali ke **Database** (sidebar)
2. Klik tombol **Connect** di cluster kamu
3. Pilih **Connect your application**
4. **Driver**: Node.js, **Version**: 5.5 or later
5. Copy **Connection String**, akan seperti ini:
   ```
   mongodb+srv://ipkadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **PENTING**: Ganti `<password>` dengan password user yang kamu buat tadi
7. Tambahkan nama database setelah `.net/`, contoh:
   ```
   mongodb+srv://ipkadmin:password123@cluster0.xxxxx.mongodb.net/ipk-tracker?retryWrites=true&w=majority
   ```

---

## 🗄️ Opsi 2: MongoDB Local (Install di Komputer)

### 1. Download & Install MongoDB

1. Download **MongoDB Community Server** dari [mongodb.com](https://www.mongodb.com/try/download/community)
2. Pilih versi terbaru untuk Windows
3. Jalankan installer:
   - Install as **Windows Service** ✅
   - **Service Name**: MongoDB
   - **Data Directory**: `C:\Program Files\MongoDB\Server\<version>\data`
   - **Log Directory**: `C:\Program Files\MongoDB\Server\<version>\log`
4. Install **MongoDB Compass** (GUI tool) - optional tapi sangat membantu

### 2. Verify Installation

Buka **Command Prompt** atau **PowerShell**, jalankan:

```powershell
mongod --version
```

Jika keluar versi MongoDB, berarti berhasil.

### 3. Jalankan MongoDB Service

MongoDB biasanya otomatis jalan sebagai Windows Service. Cek dengan:

```powershell
# Cek status service
Get-Service MongoDB

# Jika tidak running, start dengan:
Start-Service MongoDB
```

### 4. Connection String untuk Local

Jika MongoDB berjalan di local dengan default port 27017:

```
mongodb://localhost:27017/ipk-tracker
```

---

## ⚙️ Setup Backend Project

### 1. Install Dependencies

Buka terminal di folder `bootscrap/backend`:

```powershell
cd backend
npm install
```

Dependencies yang akan diinstall:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `express-validator` - Input validation
- `cors` - CORS handling
- `dotenv` - Environment variables

### 2. Buat File `.env`

Di folder `backend`, buat file `.env` (copy dari `.env.example`):

```powershell
# Di PowerShell
Copy-Item .env.example .env
```

Atau buat manual file `.env` dengan isi:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
# Pilih salah satu:

# Opsi 1: MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ipk-tracker?retryWrites=true&w=majority

# Opsi 2: MongoDB Local
# MONGODB_URI=mongodb://localhost:27017/ipk-tracker

# JWT Secret (ganti dengan string random yang kuat)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
```

**PENTING**:
- Ganti `MONGODB_URI` dengan connection string kamu (MongoDB Atlas atau Local)
- Ganti `JWT_SECRET` dengan string random yang kuat (bisa generate di [randomkeygen.com](https://randomkeygen.com/))

### 3. Test Connection (Optional)

Buat file `test-connection.js` di folder `backend`:

```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully!');
    console.log('Database:', mongoose.connection.db.databaseName);
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

testConnection();
```

Jalankan test:

```powershell
node test-connection.js
```

Jika berhasil, akan muncul:
```
✅ MongoDB Connected Successfully!
Database: ipk-tracker
```

---

## 🚀 Jalankan Backend Server

### Start Development Server

Di folder `backend`, jalankan:

```powershell
npm run dev
```

Atau jika tidak ada script `dev`, jalankan:

```powershell
node server.js
```

Jika berhasil, akan muncul:

```
🚀 Server running on port 5000
✅ MongoDB Connected
```

Backend sekarang berjalan di: **http://localhost:5000**

### Test Backend Endpoints

#### 1. Health Check

Buka browser atau gunakan Postman/Insomnia/Thunder Client:

```
GET http://localhost:5000/api/health
```

Response:
```json
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### 2. Test Signup

POST request ke `http://localhost:5000/api/auth/signup` dengan body:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "namaLengkap": "John Doe",
  "nim": "12345678",
  "programStudi": "Teknik Informatika",
  "semesterAktif": 5,
  "ipkLokal": 3.50,
  "ipkUtama": 3.45,
  "targetIpk": 3.80,
  "totalSks": 100
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "email": "user@example.com",
    "namaLengkap": "John Doe",
    ...
  }
}
```

---

## 🔄 Setup Frontend Connection

### 1. Buat File `.env` di Root Project

Di folder `bootscrap` (root), buat file `.env`:

```powershell
# Di PowerShell (dari folder bootscrap)
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

Atau buat manual file `.env` dengan isi:

```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Restart Frontend Dev Server

Jika frontend sedang running, stop (Ctrl+C) dan restart:

```powershell
npm run dev
```

Frontend akan berjalan di: **http://localhost:5173** (atau port lain yang tersedia)

---

## 🧪 Testing Full Stack

### Scenario 1: Signup User Baru

1. Buka browser: http://localhost:5173/signup
2. Isi form signup dengan data lengkap
3. Upload foto profil (maks 2MB)
4. Klik **Sign Up**
5. Cek di MongoDB Compass atau Atlas, user baru harus sudah tersimpan di collection `users`

### Scenario 2: Onboarding Wizard

1. Setelah signup berhasil, akan redirect ke onboarding
2. Isi Step 1: Nama, NIM, Program Studi, Upload Foto
3. Isi Step 2: Semester, IPK Lokal, IPK Utama, Target IPK, Total SKS
4. Klik **Selesai**
5. Data tersimpan di localStorage DAN database MongoDB

### Scenario 3: Signin & Sync Data

1. Buka **Incognito/Private Window**
2. Buka http://localhost:5173/signin
3. Login dengan email & password yang sama
4. Data IPK harus muncul (dari database, bukan localStorage)
5. Ini membuktikan multi-device sync work!

### Scenario 4: Update Semester

1. Di dashboard, klik banner "Update semester baru?"
2. Isi IPK semester baru
3. Klik **Simpan**
4. Cek di MongoDB, collection `semesterhistories` harus ada entry baru

### Scenario 5: Add Task

1. Buka http://localhost:5173/dashboard-2 (List Tugas)
2. Klik **+ Halaman baru**
3. Isi form: Nama Tugas, Mata Kuliah, Prioritas, Deadline, dst
4. Klik **Simpan Tugas**
5. Task muncul di tabel
6. Data tersimpan di localStorage (atau bisa kamu integrasikan ke backend juga)

---

## 🐛 Troubleshooting

### Error: "Cannot connect to MongoDB"

**Cek:**
1. MongoDB service berjalan (jika local):
   ```powershell
   Get-Service MongoDB
   ```
2. Connection string di `.env` benar
3. Firewall tidak block port 27017 (local) atau 27017-27019 (Atlas)
4. Jika Atlas: IP sudah di-whitelist di Network Access

**Fix:**
- Local: `Start-Service MongoDB`
- Atlas: Cek username/password, pastikan network access allow all atau include IP kamu

---

### Error: "Port 5000 already in use"

**Fix:**
1. Ganti port di `backend/.env`:
   ```env
   PORT=5001
   ```
2. Update frontend `.env`:
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```

---

### Error: "CORS blocked"

**Fix:**
Pastikan di `server.js` sudah ada:

```javascript
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true
}));
```

---

### Error: "JWT secret not defined"

**Fix:**
Pastikan file `backend/.env` ada dan berisi:

```env
JWT_SECRET=your-secret-key-here
```

---

### Frontend tidak connect ke backend

**Checklist:**
1. ✅ Backend running di `http://localhost:5000`
2. ✅ File `.env` di root bootscrap ada:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
3. ✅ Frontend sudah di-restart setelah buat `.env`
4. ✅ Browser console tidak ada error CORS

---

## 📊 Monitoring Database

### Opsi 1: MongoDB Compass (Local/Atlas)

1. Download [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Connect dengan connection string kamu
3. Bisa lihat collections: `users`, `semesterhistories`
4. Bisa edit data manual, delete, dll

### Opsi 2: MongoDB Atlas Dashboard (Atlas only)

1. Login ke [cloud.mongodb.com](https://cloud.mongodb.com)
2. Pilih cluster kamu
3. Klik **Browse Collections**
4. Lihat data real-time

---

## 🔐 Security Tips (Untuk Testing Local)

1. **Jangan commit file `.env`** - sudah ada di `.gitignore`
2. **Ganti JWT_SECRET** - jangan pakai default
3. **MongoDB Atlas**: Untuk production, batasi IP access
4. **Password**: Gunakan password kuat untuk database user

---

## 📦 Package Scripts

Di `backend/package.json`, tambahkan scripts:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  }
}
```

- `npm start` - Jalankan server production mode
- `npm run dev` - Jalankan dengan auto-reload (Node 18+ only)

Jika Node.js < 18, install `nodemon`:

```powershell
npm install --save-dev nodemon
```

Update script:

```json
{
  "scripts": {
    "dev": "nodemon server.js"
  }
}
```

---

## ✅ Checklist Setup Berhasil

- [ ] MongoDB berjalan (local service atau Atlas cluster online)
- [ ] Backend dependencies terinstall (`npm install`)
- [ ] File `backend/.env` sudah dibuat dengan MONGODB_URI dan JWT_SECRET
- [ ] Backend server running di `http://localhost:5000`
- [ ] Health check endpoint berhasil: `GET /api/health`
- [ ] File `.env` di root project berisi `VITE_API_URL=http://localhost:5000/api`
- [ ] Frontend dev server running di `http://localhost:5173`
- [ ] Test signup berhasil (cek di MongoDB ada user baru)
- [ ] Test signin berhasil (dapat token JWT)
- [ ] Data tersimpan di database (bukan cuma localStorage)

---

## 🎉 Selesai!

Sekarang kamu punya:
- ✅ Backend running local (Node.js + Express + MongoDB)
- ✅ Frontend connect ke backend
- ✅ Upload foto profil (max 2MB)
- ✅ Multi-user support dengan JWT auth
- ✅ Dual IPK tracking (Lokal + Utama)
- ✅ Task list dengan modal add task
- ✅ Semester history tracking

**Next Steps:**
- Test semua fitur secara lokal
- Fix bugs jika ada
- Optimize performance
- Siap deploy ke Vercel + Railway (nanti kalau sudah ready)

---

## 📞 Stuck? Debug Tips

### 1. Backend tidak start

```powershell
# Cek Node.js version
node --version  # Harus >= v16

# Cek MongoDB connection
node test-connection.js

# Cek .env file ada
Get-ChildItem backend\.env
```

### 2. Frontend tidak dapat data

```powershell
# Open browser console (F12)
# Lihat Network tab
# Cek apakah ada request ke http://localhost:5000/api/...

# Cek environment variable loaded
# Di browser console:
console.log(import.meta.env.VITE_API_URL)
# Harus return: http://localhost:5000/api
```

### 3. Database tidak tersimpan

- Cek MongoDB Compass atau Atlas, apakah collection `users` ada?
- Lihat terminal backend, ada error tidak?
- Test dengan Postman/Insomnia, apakah response 201 (success)?

---

**Happy Coding! 🚀**
