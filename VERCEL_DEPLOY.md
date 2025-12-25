# 🚀 Deploy FinTrack on Vercel (Frontend Only - Quickest Option)

## ⚠️ Important Note

For now, we'll deploy **only the frontend** on Vercel. The backend will run **locally** on your computer.

**Why?**
- ✅ Quickest deployment (5 minutes)
- ✅ Free forever
- ✅ No backend complexities
- ❌ Backend must run on your PC when people use the app

**Later**, we can deploy backend on Render (follow `DEPLOYMENT.md`).

---

## 📋 Step 1: Prepare Local Backend

### 1.1 Make sure backend is running locally:
```powershell
cd backend
npm install
npm run dev
```

Backend should be running on `http://localhost:8000`

---

## 🌐 Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account
1. Go to [vercel.com/signup](https://vercel.com/signup)
2. Click **"Continue with GitHub"**
3. Authorize Vercel

### 2.2 Push Code to GitHub (if not already done)
```powershell
git add .
git commit -m "Ready for Vercel deployment"
git push origin dev
```

### 2.3 Import Project on Vercel
1. Click **"Add New Project"**
2. Find your **"Personalised_AI_Finance_Tracker_Fintrack"** repository
3. Click **"Import"**

### 2.4 Configure Project
- **Framework Preset**: Vite ✅ (auto-detected)
- **Root Directory**: Click "Edit" → type `client` → Save
- **Build Command**: `npm run build` ✅ (auto-detected)
- **Output Directory**: `dist` ✅ (auto-detected)

### 2.5 Add Environment Variables

Click **"Environment Variables"** and add these:

**Backend API** (temporary - points to localhost):
```
VITE_API_BASE_URL=http://localhost:8000/api
```

**Firebase Config** (get from Firebase Console):
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**To get Firebase values:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click ⚙️ Settings → Project Settings
4. Scroll to "Your apps" → Web app
5. Copy each value

### 2.6 Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes ⏱️
3. Done! 🎉

Your frontend URL: `https://your-app-name.vercel.app`

---

## ⚙️ Step 3: Update Firebase Settings

### 3.1 Add Vercel Domain to Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. **Authentication** → **Settings** → **Authorized domains**
3. Click **"Add domain"**
4. Enter: `your-app-name.vercel.app` (without https://)
5. Save

---

## ✅ Step 4: Test Your App

1. Keep **backend running locally**: `npm run dev` in backend folder
2. Visit your Vercel URL: `https://your-app-name.vercel.app`
3. Try:
   - Sign up
   - Log in
   - Add transaction
   - View analytics

⚠️ **Important**: For others to use your app, your PC must be running the backend!

---

## 🎯 Next Steps (Optional)

### Want backend online too?

Follow `DEPLOYMENT.md` to deploy backend on Render (free), then:

1. Update `VITE_API_BASE_URL` in Vercel to your Render URL
2. Redeploy frontend

---

## 🐛 Troubleshooting

**Problem**: "Network Error" when using app
- **Solution**: Make sure backend is running locally on port 8000

**Problem**: CORS errors
- **Solution**: Backend `FRONTEND_ORIGIN` should include your Vercel URL

**Problem**: Firebase auth not working
- **Solution**: Add Vercel domain to Firebase Authorized Domains

---

## 📊 What You Get

- ✅ **Frontend**: Live 24/7 on Vercel (free)
- ✅ **Backend**: Runs on your PC (free, but must stay on)
- ✅ **Database**: Your local MongoDB (or Atlas if configured)

---

**Ready for full deployment? Check `DEPLOYMENT.md` for backend on Render!** 🚀
