# FinEnsure

A modern personal finance tracking application designed for clarity and financial assurance.

## Overview

FinEnsure helps users track income, expenses, and financial patterns with structured records and clear insights. Built for individuals who value control over their financial data, providing transparency about where money goes and why.

## Features

### Core Functionality

- **Transaction Management**
  - Track income and expenses with detailed categorization
  - Support for recurring transactions (daily, weekly, monthly, yearly)
  - Attach receipts and documents to transactions
  - Multi-currency support with automatic conversion

- **Financial Analytics**
  - Real-time dashboard with financial overview
  - Visual expense breakdowns by category
  - Income vs. expense trend analysis
  - Customizable date range filtering
  - Savings rate calculation and tracking

- **AI-Powered Insights**
  - Intelligent spending pattern analysis
  - Personalized financial recommendations
  - Automated receipt data extraction
  - Smart categorization suggestions

- **Automated Reporting**
  - Scheduled email reports (daily, weekly, bi-weekly, monthly)
  - Comprehensive financial summaries with insights
  - Top spending categories analysis
  - Customizable report delivery schedules

### User Experience

- **Multi-Language Support**
  - Available in English and Hindi
  - Easy language switching from the interface

- **Authentication**
  - Secure local authentication with email/password
  - Social login via Google and Microsoft
  - Password reset functionality
  - Session management with JWT tokens

- **Responsive Design**
  - Fully optimized for desktop, tablet, and mobile devices
  - Dark mode interface for comfortable viewing
  - Accessible UI components

## Technology Stack

### Frontend

- **Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 6.3
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Charts**: Recharts
- **Internationalization**: i18next

### Backend

- **Runtime**: Node.js with Express
- **Language**: TypeScript 5.8
- **Database**: MongoDB with Mongoose
- **Authentication**: Firebase Admin SDK, Passport.js
- **Email Service**: Nodemailer with Gmail SMTP
- **Scheduled Tasks**: node-cron
- **AI Integration**: Google Generative AI
- **File Storage**: Cloudinary

### Infrastructure

- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render
- **Database**: MongoDB Atlas
- **Version Control**: Git & GitHub

## System Architecture

### High-Level Architecture

```
┌─────────────────┐
│   Client App    │ (React + Vite)
│  (Port: 5173)   │
└────────┬────────┘
         │ HTTPS/REST API
         │
┌────────▼────────┐
│  Express Server │ (Node.js + TypeScript)
│  (Port: 8000)   │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼──────┐
│MongoDB│ │ External │
│ Atlas │ │ Services │
└───────┘ └──┬───────┘
             │
    ┌────────┼────────┐
    │        │        │
┌───▼───┐ ┌─▼──┐ ┌──▼──────┐
│Firebase│ │Gmail│ │Cloudinary│
│  Auth  │ │SMTP │ │   CDN   │
└────────┘ └─────┘ └─────────┘
```

### Low-Level Design

#### Frontend Architecture

**Component Hierarchy**
```
App
├── LandingPage (Public)
│   ├── LandingHeader
│   ├── Hero
│   ├── Features
│   ├── HowItWorks
│   └── LandingFooter
│
├── AuthPages (Public)
│   ├── SignIn
│   ├── SignUp
│   ├── ForgotPassword
│   └── ResetPassword
│
└── AppLayout (Protected)
    ├── Sidebar
    ├── Navbar
    └── Pages
        ├── Dashboard
        ├── Transactions
        ├── Reports
        └── Settings
```

**State Management Flow**
```
User Action
    ↓
Component Dispatch
    ↓
Redux Thunk/RTK Query
    ↓
API Request → Backend
    ↓
Response Handling
    ↓
Redux Store Update
    ↓
Component Re-render
```

**Redux Store Structure**
```
store/
├── auth/
│   ├── user
│   ├── accessToken
│   ├── expiresAt
│   └── reportSetting
│
├── transactions/
│   ├── list
│   ├── filters
│   └── pagination
│
├── analytics/
│   ├── overview
│   ├── trends
│   └── categories
│
└── reports/
    ├── reportList
    └── settings
```

**Routing Architecture**
```
/ (Public)
    ↓
/sign-in, /sign-up (Auth)
    ↓
Protected Routes (Authenticated)
    ├── /overview
    ├── /transactions
    ├── /reports
    └── /settings
```

#### Backend Architecture

**Three-Layer Architecture**

```
┌──────────────────────────┐
│   Presentation Layer     │
│   (Controllers)          │
│   - Request validation   │
│   - Response formatting  │
└────────┬─────────────────┘
         │
┌────────▼─────────────────┐
│   Business Logic Layer   │
│   (Services)             │
│   - Core logic           │
│   - Data processing      │
│   - External API calls   │
└────────┬─────────────────┘
         │
┌────────▼─────────────────┐
│   Data Access Layer      │
│   (Models)               │
│   - Database operations  │
│   - Data validation      │
└──────────────────────────┘
```

**Request-Response Flow**
```
1. Client Request
    ↓
2. Express Middleware Chain
    ├── CORS
    ├── Body Parser
    ├── Cookie Parser
    └── Error Handler
    ↓
3. Route Handler
    ↓
4. Authentication Middleware (if protected)
    ├── JWT Verification
    └── User Attachment
    ↓
5. Request Validator (Zod Schema)
    ↓
6. Controller
    ├── Extract data
    └── Call service
    ↓
7. Service Layer
    ├── Business logic
    ├── Database queries
    └── External API calls
    ↓
8. Database/External Services
    ↓
9. Response Formatting
    ↓
10. Client Response
```

**Database Schema Design**

**Users Collection**
```
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (hashed),
  profilePicture: String (URL),
  provider: String (local/google/microsoft),
  googleId: String (indexed),
  microsoftId: String (indexed),
  gender: String,
  country: String,
  language: String,
  welcomeEmailSent: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

**Transactions Collection**
```
{
  _id: ObjectId,
  userId: ObjectId (ref: User, indexed),
  amount: Number,
  currency: String,
  type: String (INCOME/EXPENSE),
  category: String,
  description: String,
  date: Date (indexed),
  receipt: String (Cloudinary URL),
  isRecurring: Boolean,
  recurringInterval: String (DAILY/WEEKLY/MONTHLY/YEARLY),
  nextOccurrence: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Reports Collection**
```
{
  _id: ObjectId,
  userId: ObjectId (ref: User, indexed),
  period: String,
  summary: {
    income: Number,
    expenses: Number,
    balance: Number,
    savingsRate: Number,
    topCategories: Array
  },
  insights: Array,
  status: String (PENDING/COMPLETED/FAILED),
  emailSent: Boolean,
  createdAt: Date
}
```

**ReportSettings Collection**
```
{
  _id: ObjectId,
  userId: ObjectId (ref: User, unique, indexed),
  frequency: String (DAILY/WEEKLY/BI_WEEKLY/MONTHLY),
  email: String,
  isEnabled: Boolean,
  nextReportDate: Date (indexed),
  lastSentDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Cron Job System**

```
Scheduler (scheduler.ts)
    ↓
┌───────────────┬──────────────────┐
│               │                  │
Transactions   Scheduled Reports   
Job            Job                 
(Daily 12:05AM) (Daily 11:59PM)   
    │               │              
    ▼               ▼              
Process         Check pending      
recurring       reports            
transactions    (nextReportDate <= now)
    │               │              
    ▼               ▼              
Create new      Generate report    
transaction     ↓                  
instances       Send email         
                ↓                  
                Update next date   
```

**Email Service Architecture**

```
Email Trigger
    ↓
Template Selection
    ├── Welcome Email (HTML)
    ├── Report Email (HTML)
    └── Password Reset (HTML)
    ↓
Data Preparation
    ├── User info
    ├── Report data
    └── Dynamic content
    ↓
Nodemailer Transport
    ├── Gmail SMTP
    ├── Port 587 (TLS)
    └── App-specific password
    ↓
Email Delivery
    ↓
Error Handling
    └── Silent failure logging
```

**Authentication Flow**

**Local Authentication**
```
1. User submits email/password
    ↓
2. Validator checks format
    ↓
3. User lookup in database
    ↓
4. Password comparison (bcrypt)
    ↓
5. JWT token generation
    ├── Payload: { userId }
    ├── Secret: JWT_SECRET
    └── Expiry: 7 days
    ↓
6. Report settings fetch
    ↓
7. Response with user + token + reportSetting
    ↓
8. Frontend stores in Redux + localStorage
```

**OAuth Authentication (Google/Microsoft)**
```
1. User clicks social login
    ↓
2. Firebase handles OAuth flow
    ↓
3. Frontend receives Firebase token
    ↓
4. Backend verifies token with Firebase Admin
    ↓
5. Extract user data from token
    ↓
6. Find or create user
    ├── If new: Create user + report settings
    └── If existing: Update profile
    ↓
7. Send welcome email (if new user)
    ↓
8. Generate JWT token
    ↓
9. Response with user + token + reportSetting
```

**API Security Layers**

```
Request
    ↓
Layer 1: CORS
    ├── Origin validation
    └── Allowed methods
    ↓
Layer 2: Rate Limiting
    ├── Per IP limits
    └── Per endpoint limits
    ↓
Layer 3: JWT Verification
    ├── Token extraction
    ├── Signature validation
    └── Expiry check
    ↓
Layer 4: Input Validation
    ├── Zod schema validation
    └── Type checking
    ↓
Layer 5: Authorization
    ├── User ownership check
    └── Permission validation
    ↓
Authorized Request Processing
```

**File Upload Flow**

```
Client selects file
    ↓
Frontend validation
    ├── File type (image only)
    ├── File size (< 5MB)
    └── Format (jpg, png, pdf)
    ↓
FormData creation
    ↓
API POST request
    ↓
Backend receives file
    ↓
Multer middleware
    ├── Memory storage
    └── File object creation
    ↓
Cloudinary upload
    ├── Secure upload
    ├── Auto optimization
    └── URL generation
    ↓
URL stored in database
    ↓
Response to client
    ↓
Frontend displays preview
```

**Analytics Calculation Engine**

```
Date Range Selection
    ↓
Transaction Aggregation Pipeline
    ├── Match by userId + date
    ├── Group by category
    ├── Sum amounts
    └── Calculate percentages
    ↓
Data Processing
    ├── Total income calculation
    ├── Total expenses calculation
    ├── Balance calculation
    ├── Savings rate formula
    └── Top categories sorting
    ↓
AI Insight Generation
    ├── Send data to Google AI
    ├── Structured prompt
    └── Parse AI response
    ↓
Response Formatting
    ↓
Client Visualization
```

**Report Generation System**

```
Trigger (Manual/Scheduled)
    ↓
Date Range Calculation
    ├── Daily: Yesterday
    ├── Weekly: Last 7 days
    ├── Bi-weekly: Last 15 days
    └── Monthly: Last month
    ↓
Analytics Service Call
    ├── Fetch transactions
    ├── Calculate metrics
    └── Generate insights
    ↓
Report Document Creation
    ├── Store in Reports collection
    └── Status: PENDING
    ↓
Email Template Rendering
    ├── HTML formatting
    ├── Data injection
    └── Styling inline CSS
    ↓
Email Sending
    ↓
Update Report Status
    ├── COMPLETED (if successful)
    └── FAILED (if error)
    ↓
Update Next Report Date
    └── Calculate based on frequency
```

**Error Handling Strategy**

```
Error Occurrence
    ↓
Error Type Detection
    ├── Validation Error → 400
    ├── Unauthorized → 401
    ├── Forbidden → 403
    ├── Not Found → 404
    ├── Conflict → 409
    └── Server Error → 500
    ↓
Error Handler Middleware
    ├── Format error response
    ├── Log to console
    └── Sanitize message
    ↓
Client Response
    {
      success: false,
      message: "Error description",
      errorCode: "ERROR_CODE"
    }
    ↓
Frontend Error Display
    ├── Toast notification
    └── Error state update
```

**Deployment Pipeline**

```
Local Development
    ├── Backend: npm run dev
    └── Frontend: npm run dev
    ↓
Git Commit
    ↓
Push to GitHub
    ├── Branch: devnew (development)
    └── Branch: dev (production)
    ↓
Automatic Deployments
    ├── Vercel (Frontend)
    │   ├── Build command: npm run build
    │   ├── Output: dist/
    │   └── Deploy to CDN
    │
    └── Render (Backend)
        ├── Build command: npm run build
        ├── Start command: node dist/index.js
        └── Deploy to container
    ↓
Live Application
    ├── Frontend: Vercel domain
    └── Backend: Render domain
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas cluster)
- Gmail account (for email features)
- Firebase project (for social authentication)
- Cloudinary account (for file uploads)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/arjun9978/Personalised_AI_Finance_Tracker_FinEnsure.git
   cd Personalised_AI_Finance_Tracker_FinEnsure
   ```

2. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd ../client
   npm install
   ```

### Configuration

#### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server
PORT=8000
NODE_ENV=development
FRONTEND_ORIGIN=http://localhost:5173

# Database
DATABASE_URL=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Email (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password

# Firebase
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google AI
GEMINI_API_KEY=your_gemini_api_key
```

#### Frontend Environment Variables

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Running Locally

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:8000`

#### Start Frontend Development Server

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173`

### Building for Production

#### Build Backend

```bash
cd backend
npm run build
```

#### Build Frontend

```bash
cd client
npm run build
```

## Project Structure

```
fintrack/
├── backend/
│   ├── src/
│   │   ├── @types/          # TypeScript type definitions
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── cron/            # Scheduled jobs
│   │   ├── mailers/         # Email templates and services
│   │   ├── middlewares/     # Express middlewares
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   ├── validators/      # Request validators
│   │   └── index.ts         # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── client/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── @types/          # TypeScript types
│   │   ├── app/             # Redux store configuration
│   │   ├── components/      # Reusable components
│   │   ├── config/          # App configuration
│   │   ├── features/        # Redux features/slices
│   │   ├── hooks/           # Custom React hooks
│   │   ├── i18n/            # Internationalization
│   │   ├── layouts/         # Layout components
│   │   ├── pages/           # Page components
│   │   ├── routes/          # Route definitions
│   │   ├── App.tsx          # Root component
│   │   └── main.tsx         # Entry point
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login with credentials
- `POST /api/auth/google` - Google OAuth authentication
- `POST /api/auth/microsoft` - Microsoft OAuth authentication
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Transaction Endpoints

- `GET /api/transactions` - Get all transactions (with pagination)
- `POST /api/transactions` - Create new transaction
- `GET /api/transactions/:id` - Get transaction by ID
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `POST /api/transactions/upload-receipt` - Upload receipt image

### Report Endpoints

- `GET /api/reports` - Get all reports
- `POST /api/reports/generate` - Generate instant report
- `GET /api/reports/settings` - Get report settings
- `PUT /api/reports/settings` - Update report settings

### Analytics Endpoints

- `GET /api/analytics/overview` - Get financial overview
- `GET /api/analytics/trends` - Get spending trends
- `GET /api/analytics/categories` - Get category breakdown

### User Endpoints

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/preferences` - Update user preferences

## Features in Detail

### Transaction Management

Users can create transactions with the following attributes:
- Amount and currency
- Category selection (predefined or custom)
- Transaction type (income/expense)
- Date and time
- Description and notes
- Receipt attachments
- Recurring schedule (optional)

### Financial Reports

Automated reports include:
- Period summary (income, expenses, balance)
- Savings rate percentage
- Top spending categories with percentages
- AI-generated insights and recommendations
- Trend analysis compared to previous periods

### Scheduled Email Reports

Users can configure:
- Report frequency (daily, weekly, bi-weekly, monthly)
- Custom email address for delivery
- Enable/disable reporting
- View next scheduled report date

## Security

- Password hashing with bcrypt
- JWT-based authentication with expiration
- HTTP-only cookies for token storage
- CORS configuration for allowed origins
- Environment variable protection
- Firebase Admin SDK for OAuth verification
- Input validation and sanitization

## Contributing

This is a personal project, but suggestions and feedback are welcome. Please open an issue to discuss potential changes.

## License

This project is proprietary and not open for redistribution or commercial use.

## Support

For questions or issues, please contact through the repository's issue tracker.

## Acknowledgments

- Google Generative AI for intelligent insights
- Firebase for authentication infrastructure
- Cloudinary for media management
- MongoDB Atlas for database hosting
- Vercel and Render for deployment platforms

