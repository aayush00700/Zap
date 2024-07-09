// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chat-site-3cc86.firebaseapp.com",
  projectId: "react-chat-site-3cc86",
  storageBucket: "react-chat-site-3cc86.appspot.com",
  messagingSenderId: "398931737007",
  appId: "1:398931737007:web:ee4596b761126d7523975a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore();
export const storage = getStorage();
