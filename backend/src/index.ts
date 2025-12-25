import "dotenv/config";
import "./config/passport.config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import passport from "passport";
import { Env } from "./config/env.config";
import { HTTPSTATUS } from "./config/http.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { BadRequestException } from "./utils/app-error";
import { asyncHandler } from "./middlewares/asyncHandler.middlerware";
import connctDatabase from "./config/database.config";
import authRoutes from "./routes/auth.route";
import { passportAuthenticateJwt } from "./config/passport.config";
import userRoutes from "./routes/user.route";
import transactionRoutes from "./routes/transaction.route";
import { initializeCrons } from "./cron";
import reportRoutes from "./routes/report.route";
import { getDateRange } from "./utils/date";
import analyticsRoutes from "./routes/analytics.route";
import { initializeFirebase } from "./config/firebase.config";

const app = express();
const BASE_PATH = Env.BASE_PATH;

// Initialize Firebase Admin
initializeFirebase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

// CORS configuration - supports multiple origins
const allowedOrigins = Env.FRONTEND_ORIGIN.split(',').map(origin => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTPSTATUS.OK).json({
      message: "FinTrack API is running",
      version: "1.0.0",
      status: "healthy"
    });
  })
);

// Health check endpoint for Render
app.get(
  `${BASE_PATH}/health`,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTPSTATUS.OK).json({
      status: "healthy",
      timestamp: new Date().toISOString()
    });
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, passportAuthenticateJwt, userRoutes);
app.use(`${BASE_PATH}/transaction`, passportAuthenticateJwt, transactionRoutes);
app.use(`${BASE_PATH}/report`, passportAuthenticateJwt, reportRoutes);
app.use(`${BASE_PATH}/analytics`, passportAuthenticateJwt, analyticsRoutes);

app.use(errorHandler);

app.listen(Env.PORT, async () => {
  await connctDatabase();

if (["development", "production"].includes(Env.NODE_ENV)) {
  await initializeCrons();
}

  console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});