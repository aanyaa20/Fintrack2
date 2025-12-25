import admin from "firebase-admin";
import path from "path";
import * as fs from "fs";
import { Env } from "./env.config";

let firebaseInitialized = false;

export const initializeFirebase = () => {
  if (!firebaseInitialized) {
    try {
      let serviceAccount;

      // Production: Try environment variable first
      if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        try {
          serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
          console.log("Using Firebase credentials from environment variable");
        } catch (error) {
          console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT env variable:", error);
        }
      }

      // Development: Fall back to file
      if (!serviceAccount) {
        const serviceAccountPath = path.join(__dirname, "../../firebase-service-account.json");
        
        if (!fs.existsSync(serviceAccountPath)) {
          console.warn("Firebase service account not found. Google auth will not work.");
          return;
        }

        serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
        console.log("Using Firebase credentials from file");
      }

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });

      firebaseInitialized = true;
      console.log("Firebase Admin initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Firebase Admin:", error);
    }
  }
};

export const verifyFirebaseToken = async (token: string) => {
  if (!firebaseInitialized) {
    initializeFirebase();
  }

  if (!firebaseInitialized) {
    throw new Error("Firebase is not initialized");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Firebase token verification error:", error);
    throw new Error("Invalid Firebase token");
  }
};

export default admin;
