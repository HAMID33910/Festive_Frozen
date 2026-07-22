import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPfw4j_FjTXFTfEMpjjc-6EFKJYX2VU6E",
  authDomain: "festive-frozen-foods.firebaseapp.com",
  projectId: "festive-frozen-foods",
  storageBucket: "festive-frozen-foods.firebasestorage.app",
  messagingSenderId: "344348114579",
  appId: "1:344348114579:web:35a0c7c62622f614f4d766",
  measurementId: "G-K12B6YJNSG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;