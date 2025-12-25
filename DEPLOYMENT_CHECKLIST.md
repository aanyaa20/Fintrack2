# FinTrack Deployment - Quick Reference

## 📝 Environment Variables Needed

### Backend (Render)
```
NODE_ENV=production
PORT=8000
BASE_PATH=/api
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/fintrack
JWT_SECRET=your_secret_32_chars_min
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret_32_chars_min
JWT_REFRESH_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
FRONTEND_ORIGIN=https://your-app.vercel.app
GITHUB_CLIENT_ID=your_github_id
GITHUB_CLIENT_SECRET=your_github_secret
GITHUB_CALLBACK_URL=https://your-backend.onrender.com/api/auth/github/callback
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
```

### Frontend (Vercel)
```
VITE_API_BASE_URL=https://your-backend.onrender.com/api
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 🔗 Service URLs

- MongoDB Atlas: https://cloud.mongodb.com
- Render: https://render.com
- Vercel: https://vercel.com
- Firebase Console: https://console.firebase.google.com
- GitHub OAuth: https://github.com/settings/developers
- Cloudinary: https://cloudinary.com/console
- Google AI Studio: https://aistudio.google.com/app/apikey

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password saved
- [ ] Network access set to 0.0.0.0/0
- [ ] MongoDB connection string copied
- [ ] Render account created with GitHub
- [ ] Backend deployed on Render
- [ ] All backend environment variables set
- [ ] Backend URL tested and working
- [ ] Vercel account created with GitHub
- [ ] Frontend deployed on Vercel
- [ ] All frontend environment variables set
- [ ] FRONTEND_ORIGIN updated in Render
- [ ] Vercel domain added to Firebase authorized domains
- [ ] GitHub OAuth callback updated
- [ ] Full app tested end-to-end

## 🎯 Your Live URLs

**Frontend:** https://_________________.vercel.app
**Backend API:** https://_________________.onrender.com

**Test Backend Health:** Visit backend URL + `/` → Should show API running message

---

See `DEPLOYMENT.md` for complete step-by-step guide.
