# IPK Tracker Backend API

Backend server untuk IPK Tracker dengan multi-user support menggunakan Node.js, Express, dan MongoDB.

## 🚀 Features

- **Authentication**: JWT-based login/signup
- **User Management**: Profile dan data akademik
- **Semester Tracking**: History IPK per semester
- **Multi-user**: Setiap user punya data tersendiri
- **Secure**: Password hashing dengan bcrypt

## 📋 Prerequisites

Sebelum mulai, pastikan sudah install:

- **Node.js** (v18 atau lebih baru) - [Download](https://nodejs.org/)
- **MongoDB** (v6 atau lebih baru) - [Download](https://www.mongodb.com/try/download/community)
  - Alternatif: Pakai [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud, gratis)

## 🛠️ Setup & Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Environment Variables

Copy file `.env.example` jadi `.env`:

```bash
cp .env.example .env
```

Edit file `.env` dan sesuaikan:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ipk-tracker
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**Penting**: Ganti `JWT_SECRET` dengan string random yang aman!

### 3. Start MongoDB

**Jika pakai MongoDB lokal:**

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

**Jika pakai MongoDB Atlas:**
- Daftar di [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Buat cluster gratis
- Dapatkan connection string
- Update `MONGODB_URI` di `.env`

### 4. Run Server

**Development mode (dengan auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

Server akan jalan di `http://localhost:5000`

## 📡 API Endpoints

### Authentication

#### Register (Signup)
```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "namaLengkap": "John Doe",
  "nim": "123456789",
  "programStudi": "Teknik Informatika",
  "semesterAktif": 5,
  "ipkLokal": 3.50,
  "ipkUtama": 3.45,
  "targetIpk": 3.80,
  "totalSks": 120
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "email": "user@example.com",
    "namaLengkap": "John Doe",
    ...
  }
}
```

#### Login (Signin)
```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### User Profile

#### Get Profile
```http
GET /api/user/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "namaLengkap": "John Doe Updated",
  "programStudi": "Sistem Informasi"
}
```

#### Update Academic Data
```http
PUT /api/user/academic
Authorization: Bearer <token>
Content-Type: application/json

{
  "semesterAktif": 6,
  "ipkLokal": 3.60,
  "ipkUtama": 3.55,
  "targetIpk": 3.80,
  "totalSks": 144
}
```

### Semester History

#### Get History
```http
GET /api/semester/history
Authorization: Bearer <token>
```

#### Update Semester
```http
POST /api/semester/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "semester": 6,
  "ipkLokal": 3.60,
  "ipkUtama": 3.55
}
```

## 🗄️ Database Schema

### User Collection
```javascript
{
  email: String,
  password: String (hashed),
  namaLengkap: String,
  nim: String,
  programStudi: String,
  semesterAktif: Number,
  ipkLokal: Number,
  ipkUtama: Number,
  targetIpk: Number,
  totalSks: Number,
  onboardingCompleted: Boolean,
  lastUpdatedSemester: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### SemesterHistory Collection
```javascript
{
  userId: ObjectId,
  semester: Number,
  ipkLokal: Number,
  ipkUtama: Number,
  date: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security

- Passwords di-hash menggunakan bcrypt
- JWT tokens untuk authentication
- Input validation dengan express-validator
- CORS enabled untuk frontend integration

## 🚀 Deployment

### Deploy ke Railway

1. Push code ke GitHub
2. Buat akun di [Railway](https://railway.app/)
3. Connect GitHub repo
4. Add MongoDB plugin di Railway
5. Set environment variables di Railway dashboard
6. Deploy otomatis!

### Deploy ke Render

1. Push code ke GitHub
2. Buat akun di [Render](https://render.com/)
3. Create new Web Service
4. Connect GitHub repo
5. Set environment variables
6. Deploy!

## 🧪 Testing API

**Manual testing dengan curl:**

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "namaLengkap": "Test User",
    "nim": "123456",
    "programStudi": "TI",
    "semesterAktif": 5,
    "ipkLokal": 3.5,
    "ipkUtama": 3.4,
    "targetIpk": 3.8,
    "totalSks": 120
  }'

# Signin
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Get profile (ganti <TOKEN> dengan token dari signin)
curl http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer <TOKEN>"
```

**Atau pakai Postman/Insomnia untuk testing yang lebih mudah.**

## 📁 Project Structure

```
backend/
├── models/
│   ├── User.js              # User model dengan IPK fields
│   └── SemesterHistory.js   # Semester history model
├── routes/
│   ├── auth.js              # Signup/Signin endpoints
│   ├── user.js              # User profile endpoints
│   └── semester.js          # Semester update endpoints
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── .env.example             # Environment template
├── .gitignore               # Git ignore file
├── package.json             # Dependencies
├── server.js                # Main server file
└── README.md                # This file
```

## 🆘 Troubleshooting

**MongoDB connection error:**
- Cek MongoDB service running
- Verifikasi `MONGODB_URI` di `.env`
- Pastikan port 27017 tidak dipakai aplikasi lain

**Port already in use:**
- Ganti `PORT` di `.env` ke port lain (misal 5001)

**JWT token invalid:**
- Pastikan kirim token di header: `Authorization: Bearer <token>`
- Check token belum expired (default 30 hari)

## 📝 Next Steps

1. ✅ Setup backend (kamu di sini)
2. Update frontend untuk connect ke API
3. Deploy backend ke cloud (Railway/Render)
4. Deploy frontend ke GitHub Pages/Vercel

## 📞 Support

Ada masalah? Check:
- MongoDB logs: `mongod.log`
- Server logs di terminal
- Network tab di browser DevTools
