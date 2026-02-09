# 🚀 Deployment Guide - Vercel + Railway

## 📌 Architecture

### **Recommended Setup:**
```
Frontend (Vue.js)  →  Vercel (Free)
    ↓
Backend (Node.js)  →  Railway (Free)
    ↓
Database (MongoDB) →  MongoDB Atlas (Free)
```

---

## 🎯 Vercel Deployment (Frontend)

### Prerequisites
- GitHub account
- Vercel account (gratis, signup dengan GitHub)

### Step 1: Prepare Frontend

```bash
# Di root project
npm install

# Test build locally
npm run build

# Preview build
npm run preview
```

### Step 2: Setup Environment Variables

Create `.env` file:
```env
VITE_API_URL=https://your-backend.railway.app/api
```

**Penting:** Ganti URL setelah backend di-deploy!

### Step 3: Deploy ke Vercel

**Option A: Via Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

**Option B: Via Vercel Dashboard (Recommended)**

1. Push code ke GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. Buka [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import GitHub repository
5. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. Add Environment Variables:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend.railway.app/api` (update setelah backend deploy)

7. Click "Deploy"

### Step 4: Custom Domain (Optional)

1. Pergi ke Settings → Domains
2. Add custom domain atau pakai domain gratis: `your-app.vercel.app`

---

## 🚂 Railway Deployment (Backend)

### Prerequisites
- GitHub account
- Railway account (gratis, signup dengan GitHub)

### Step 1: Prepare Backend

```bash
cd backend

# Test locally first
npm install
npm run dev
```

### Step 2: Setup MongoDB Atlas

1. Buka [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster (M0 Sandbox)
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow all)
5. Get connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ipk-tracker?retryWrites=true&w=majority
   ```

### Step 3: Deploy ke Railway

1. Push backend ke GitHub:
```bash
git add backend/
git commit -m "Add backend for Railway"
git push origin main
```

2. Buka [railway.app](https://railway.app)
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Pilih repository kamu
6. Railway auto-detect Node.js project

### Step 4: Configure Environment Variables

Di Railway Dashboard → Variables, add:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ipk-tracker
JWT_SECRET=super_secret_random_string_change_this
NODE_ENV=production
```

**Generate JWT Secret:**
```bash
# Di terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Set Root Directory

Kalau backend di folder `backend/`:
1. Settings → Service
2. Root Directory: `/backend`
3. Start Command: `npm start`

### Step 6: Deploy!

Railway akan auto-deploy dan kasih URL:
```
https://your-app.up.railway.app
```

Copy URL ini!

---

## 🔗 Connect Frontend & Backend

### Update Frontend Environment

1. Di Vercel Dashboard → Settings → Environment Variables
2. Update `VITE_API_URL`:
   ```
   https://your-backend.up.railway.app/api
   ```

3. Redeploy:
   - Vercel auto-redeploy dari GitHub
   - Atau manual trigger di Vercel Dashboard

### Test Connection

```bash
# Test backend health
curl https://your-backend.up.railway.app/api/health

# Should return:
# {"status":"OK","message":"Server is running"}
```

---

## ✅ Post-Deployment Checklist

### Backend (Railway)
- [x] MongoDB Atlas connected
- [x] Environment variables set
- [x] Health endpoint working
- [x] CORS configured for frontend URL

### Frontend (Vercel)
- [x] Build successful
- [x] Environment variables set
- [x] API URL points to Railway backend
- [x] Test signup/signin flow

### Test Full Flow
1. Open Vercel URL: `https://your-app.vercel.app`
2. Click Sign Up
3. Fill onboarding form
4. Check data saved to MongoDB Atlas
5. Login from different browser
6. Data should persist!

---

## 🔧 Troubleshooting

### "Cannot connect to backend"

**Check CORS in backend:**
```javascript
// backend/server.js
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-app.vercel.app' // Add your Vercel URL
  ]
}));
```

Redeploy Railway setelah update.

### "Build failed on Vercel"

**Check build logs:**
- Missing dependencies? Add to `package.json`
- Environment variables? Add di Vercel dashboard
- TypeScript errors? Fix di local first

### "MongoDB connection timeout"

**Check MongoDB Atlas:**
- Whitelist IP `0.0.0.0/0`
- Database user created
- Connection string correct
- Network access allowed

### "Backend crashes on Railway"

**Check Railway logs:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# View logs
railway logs
```

Common issues:
- Missing environment variables
- MongoDB connection string wrong
- Port binding (`process.env.PORT`)

---

## 💰 Cost Breakdown (All Free!)

### Vercel (Free Tier)
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Auto SSL/HTTPS
- ✅ Global CDN
- ✅ Custom domains

### Railway (Free Trial)
- ✅ $5 free credit/month
- ✅ Enough untuk small app
- ✅ Auto HTTPS
- ✅ Environment management

### MongoDB Atlas (Free Tier)
- ✅ 512MB storage
- ✅ Shared cluster
- ✅ Auto backups
- ✅ Multiple databases

**Total Cost: $0/month** 🎉

---

## 🔐 Security Best Practices

### Environment Variables
- ❌ NEVER commit `.env` files
- ✅ Use Vercel/Railway dashboard
- ✅ Rotate JWT secrets periodically

### HTTPS
- ✅ Vercel auto-provides SSL
- ✅ Railway auto-provides SSL
- ✅ No HTTP in production

### Database
- ✅ Use MongoDB Atlas (managed)
- ✅ Enable authentication
- ✅ Backup regularly

### API Keys
- ✅ Keep JWT_SECRET secret
- ✅ Use strong passwords
- ✅ Enable rate limiting (future)

---

## 📊 Monitoring & Analytics

### Vercel Analytics
```bash
npm install @vercel/analytics
```

```javascript
// main.ts
import { inject } from '@vercel/analytics'
inject()
```

### Railway Logs
- Dashboard → Service → Logs
- Real-time monitoring
- Error tracking

---

## 🚀 CI/CD (Auto Deploy)

### Setup
1. Connect GitHub to Vercel ✅
2. Connect GitHub to Railway ✅

### Auto Deploy Flow
```
1. Push to GitHub
   ↓
2. Vercel auto-builds frontend
   ↓
3. Railway auto-builds backend
   ↓
4. Both live in ~2-3 minutes!
```

### Branch Deployments
- `main` → Production
- `dev` → Preview (Vercel auto-creates preview URL)

---

## 📱 Mobile App (Future)

Karena backend sudah REST API, bisa langsung bikin:
- React Native app
- Flutter app
- iOS/Android native

Same API, different frontend! 🎉

---

## 🆘 Need Help?

### Vercel Support
- [Vercel Docs](https://vercel.com/docs)
- [Discord](https://vercel.com/discord)

### Railway Support
- [Railway Docs](https://docs.railway.app)
- [Discord](https://discord.gg/railway)

### MongoDB Atlas
- [Docs](https://www.mongodb.com/docs/atlas/)
- [Community Forum](https://www.mongodb.com/community/forums/)

---

## 🎯 Next Steps After Deployment

1. ✅ Share URL with friends
2. ✅ Collect feedback
3. ✅ Monitor errors
4. ✅ Add features:
   - Email verification
   - Password reset
   - Profile pictures
   - Export data (PDF/Excel)
   - Dark mode persistence
   - Notifications

---

## 📝 Deployment Checklist

```bash
# Frontend (Vercel)
□ Build test passed locally
□ Environment variables set
□ Custom domain configured (optional)
□ Analytics enabled (optional)

# Backend (Railway)
□ MongoDB Atlas setup
□ Environment variables set
□ Health endpoint working
□ CORS configured

# Testing
□ Signup flow works
□ Login flow works
□ Data persists across devices
□ IPK update works
□ Semester history saved

# Production Ready
□ Error monitoring setup
□ Backups configured
□ SSL/HTTPS enabled
□ Performance tested
```

---

## 🎉 You're Live!

Congrats! Your IPK Tracker is now:
- ✅ Multi-user ready
- ✅ Cloud-hosted
- ✅ Auto-scaling
- ✅ Free tier
- ✅ Production-ready

Share your app: `https://your-app.vercel.app` 🚀
