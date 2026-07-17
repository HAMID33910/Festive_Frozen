import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhOBG8CIQZzrqsbO8oeTLk3t5qZB0r-vA",
  authDomain: "festive-frozen.firebaseapp.com",
  projectId: "festive-frozen",
  storageBucket: "festive-frozen.firebasestorage.app",
  messagingSenderId: "568852537279",
  appId: "1:568852537279:web:f997ec327475dea5148b0a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;