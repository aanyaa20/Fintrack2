# Local Development Setup

## Prerequisites
- Node.js 18+ installed
- MongoDB running locally OR MongoDB Atlas account
- Firebase project setup
- Git installed

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/arjun9978/Personalised_AI_Finance_Tracker_Fintrack.git
cd Personalised_AI_Finance_Tracker_Fintrack
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `backend/.env` file:
```env
NODE_ENV=development
PORT=8000
BASE_PATH=/api
MONGO_URI=mongodb://localhost:27017/fintrack
JWT_SECRET=your_local_jwt_secret
JWT_REFRESH_SECRET=your_local_refresh_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_ORIGIN=http://localhost:5173
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:8000/api/auth/github/callback
```

Start backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../client
npm install
```

Create `client/.env` file:
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Start frontend:
```bash
npm run dev
```

### 4. Access Application
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/api

## Project Structure
```
├── backend/          # Express.js API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── index.ts
│   └── package.json
│
├── client/           # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── features/
│   │   └── App.tsx
│   └── package.json
```

## Deployment
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for production deployment instructions.
