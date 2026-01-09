# 🚀 FinEnsure Deployment Guide

Complete step-by-step guide to deploy your FinEnsure application to production.

---

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ GitHub account
- ✅ All code committed and pushed to GitHub
- ✅ Firebase project configured
- ✅ Cloudinary account
- ✅ Google Gemini API key
- ✅ Gmail account with app password

---

## 🗂️ STEP 1: Setup MongoDB Atlas (Database)

### 1.1 Create Account & Cluster
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for free
3. Click **"Build a Database"** → Choose **"M0 Free"** tier
4. Select region closest to you → Click **"Create"**

### 1.2 Create Database User
1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Username: `fintrack_admin`
4. Click **"Autogenerate Secure Password"** → **COPY & SAVE IT!**
5. Select **"Atlas admin"** privilege
6. Click **"Add User"**

### 1.3 Allow Network Access
1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### 1.4 Get Connection String
1. Go to **"Database"** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Copy connection string (looks like):
   ```
   mongodb+srv://fintrack_admin:<password>@cluster0.xxxxx.mongodb.net/
   ```
4. Replace `<password>` with your saved password
5. Add database name `/fintrack` at the end:
   ```
   mongodb+srv://fintrack_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/fintrack?retryWrites=true&w=majority
   ```
6. **SAVE THIS - you'll need it soon!**

---

## 🖥️ STEP 2: Deploy Backend on Render

### 2.1 Create Render Account
1. Go to [Render.com](https://render.com)
2. Sign up using **GitHub** (easier integration)

### 2.2 Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Click **"Connect account"** and authorize Render to access your GitHub
3. Find and select your **FinTrack repository**
4. Configure settings:
   - **Name**: `fintrack-backend`
   - **Region**: Choose closest to your location
   - **Branch**: `dev` (or `main`)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: **Free**

### 2.3 Add Environment Variables

Click **"Advanced"** → Scroll to **"Environment Variables"** → Add each one:

```env
NODE_ENV=production
PORT=8000
BASE_PATH=/api
```

**MongoDB** (from Step 1.4):
```env
MONGO_URI=mongodb+srv://fintrack_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/fintrack?retryWrites=true&w=majority
```

**JWT Secrets** (generate random strings - see tip below):
```env
JWT_SECRET=your_super_secure_random_32_plus_char_string
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=another_super_secure_random_32_plus_char_string
JWT_REFRESH_EXPIRES_IN=7d
```

**Google Gemini API** (get from [AI Studio](https://aistudio.google.com/app/apikey)):
```env
GEMINI_API_KEY=AIzaSy...your_key_here
```

**Cloudinary** (get from [Cloudinary Console](https://cloudinary.com/console)):
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Email** (use Gmail app password - see tip below):
```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password
```

**Frontend** (temporary - we'll update later):
```env
FRONTEND_ORIGIN=http://localhost:5173
```

**GitHub OAuth** (get from [GitHub Settings](https://github.com/settings/developers)):
```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=https://fintrack-backend.onrender.com/api/auth/github/callback
```
*(Replace `fintrack-backend` with your actual service name)*

**Firebase Service Account**:
```env
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"your-project-id","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}
```
*Open your `firebase-service-account.json` and copy ALL content as ONE LINE*

### 2.4 Deploy!
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for first deployment
3. Once successful, you'll see **"Your service is live"**
4. Copy your backend URL (e.g., `https://fintrack-backend.onrender.com`)
5. **Test it**: Visit `https://YOUR-SERVICE-NAME.onrender.com/`
   - Should show: `{"message": "FinTrack API is running", ...}`

✅ **Backend is now live!**

---

## 🌐 STEP 3: Deploy Frontend on Vercel

### 3.1 Create Vercel Account
1. Go to [Vercel.com](https://vercel.com/signup)
2. Sign up with **GitHub**

### 3.2 Import Project
1. Click **"Add New Project"**
2. Click **"Import"** next to your FinTrack repository
3. Configure:
   - **Framework Preset**: Vite ✅ (auto-detected)
   - **Root Directory**: Click **"Edit"** → Enter `client`
   - **Build Command**: `npm run build` ✅ (auto-detected)
   - **Output Directory**: `dist` ✅ (auto-detected)

### 3.3 Add Environment Variables

Click **"Environment Variables"** and add:

**Backend API** (use your Render URL from Step 2.4):
```env
VITE_API_BASE_URL=https://YOUR-BACKEND-NAME.onrender.com/api
```

**Firebase Config** (get from [Firebase Console](https://console.firebase.google.com/)):
1. Open Firebase Console → Select project
2. Click ⚙️ (Settings) → Project Settings
3. Scroll to "Your apps" → Web app config
4. Copy each value:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3.4 Deploy!
1. Click **"Deploy"**
2. Wait 2-5 minutes
3. Once done, click **"Continue to Dashboard"**
4. Copy your frontend URL (e.g., `https://fintrack-xyz123.vercel.app`)

✅ **Frontend is now live!**

---

## 🔗 STEP 4: Connect Everything Together

### 4.1 Update Backend CORS
1. Go to **Render Dashboard** → Your backend service
2. Go to **"Environment"** tab
3. Find `FRONTEND_ORIGIN` variable
4. **Edit** and change to your Vercel URL:
   ```
   FRONTEND_ORIGIN=https://YOUR-VERCEL-APP.vercel.app
   ```
5. Click **"Save Changes"** (backend will auto-redeploy)

### 4.2 Update Firebase Authorized Domains
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Go to **Authentication** → **Settings** → **Authorized domains**
3. Click **"Add domain"**
4. Enter your Vercel domain: `YOUR-VERCEL-APP.vercel.app` (without https://)
5. Click **"Add"**

### 4.3 Update GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click your OAuth App (or create new one)
3. Update:
   - **Homepage URL**: `https://YOUR-VERCEL-APP.vercel.app`
   - **Authorization callback URL**: `https://YOUR-BACKEND.onrender.com/api/auth/github/callback`
4. Click **"Update application"**

---

## ✅ STEP 5: Test Your Live App!

### Visit Your App
Open: `https://YOUR-VERCEL-APP.vercel.app`

### Test Everything:
1. ✅ Sign up with email
2. ✅ Log in
3. ✅ Add a transaction
4. ✅ View analytics dashboard
5. ✅ Generate a report
6. ✅ Try Google/GitHub sign-in

---

## 💡 Important Tips

### Generate Secure JWT Secrets
**Windows PowerShell:**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

**Or use online:** [RandomKeygen.com](https://randomkeygen.com/)

### Get Gmail App Password
1. Go to [Google Account](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App Passwords**
4. Select **Mail** → **Other** → Name it "FinEnsure"
5. Copy the 16-character password (no spaces)

### Firebase Service Account
- Open `backend/firebase-service-account.json`
- Copy ENTIRE content
- Paste as **single line** (remove line breaks)
- Or use online JSON minifier

---

## 🐛 Common Issues & Fixes

### ❌ "Application failed to respond" (Render)
**Fix:** 
- Check Render logs (Dashboard → Logs)
- Verify all environment variables are set
- Check MongoDB connection string is correct

### ❌ CORS errors in browser
**Fix:**
- Verify `FRONTEND_ORIGIN` in Render matches Vercel URL exactly
- Include `https://` protocol
- Save changes and wait for redeployment

### ❌ "Network Error" on frontend
**Fix:**
- Check `VITE_API_BASE_URL` in Vercel settings
- Should be: `https://your-backend.onrender.com/api`
- Redeploy frontend after fixing

### ❌ Google Sign-In fails
**Fix:**
- Add Vercel domain to Firebase Authorized Domains
- Wait 5 minutes for changes to propagate

### ❌ Slow first load (Render)
**Expected!**
- Free tier spins down after 15 min inactivity
- First request takes ~30 seconds (cold start)
- Subsequent requests are fast

---

## 📊 What You Get (Free Tier)

| Service | Storage | Bandwidth | Uptime |
|---------|---------|-----------|--------|
| **Render** | N/A | Unlimited | 750 hrs/month |
| **Vercel** | 100GB | Unlimited | 100% |
| **MongoDB Atlas** | 512MB | Unlimited | 100% |

**Total Cost: $0/month** 🎉

---

## 🎯 Next Steps (Optional)

### Add Custom Domain
1. Buy domain (Namecheap/GoDaddy)
2. Vercel: Settings → Domains → Add
3. Update DNS records as instructed

### Enable HTTPS (Automatic!)
- ✅ Render: Auto HTTPS
- ✅ Vercel: Auto HTTPS
- No configuration needed!

### Monitor Your App
- **Render**: Logs tab for backend errors
- **Vercel**: Analytics for traffic
- **MongoDB Atlas**: Database metrics

---

## 🎉 Success!

Your **FinEnsure** app is now **LIVE** and accessible worldwide!

**Share your app:**
- 🌐 Frontend: `https://YOUR-APP.vercel.app`
- 🔌 API: `https://YOUR-BACKEND.onrender.com`

---

## 📞 Need Help?

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)

---

**Happy Deploying! 🚀**
