import admin from "firebase-admin";
import path from "path";
import * as fs from "fs";

let firebaseInitialized = false;

export const initializeFirebase = () => {
  if (!firebaseInitialized) {
    try {
      const serviceAccountPath = path.join(__dirname, "../../firebase-service-account.json");
      
      if (!fs.existsSync(serviceAccountPath)) {
        console.warn("Firebase service account file not found. Google auth will not work.");
        return;
      }

      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

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
