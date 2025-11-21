import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDegwcoCDQx_20_hjOANqc5ROi7RpLuwbM",
  authDomain: "fintrack-af3ca.firebaseapp.com",
  projectId: "fintrack-af3ca",
  storageBucket: "fintrack-af3ca.firebasestorage.app",
  messagingSenderId: "94764973734",
  appId: "1:94764973734:web:35dff0e3e475b83b57be67",
  measurementId: "G-CZK9Q23HDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const microsoftProvider = new OAuthProvider('microsoft.com');
