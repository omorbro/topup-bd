import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDE7J_k7d8RJB39LmjQXGuFWm7AMpjAWrI",
  authDomain: "topup-bd-600b5.firebaseapp.com",
  projectId: "topup-bd-600b5",
  storageBucket: "topup-bd-600b5.firebasestorage.app",
  messagingSenderId: "950554800995",
  appId: "1:950554800995:web:e45d692acf00d75ebb5956",
  measurementId: "G-D6399XFRDE",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
