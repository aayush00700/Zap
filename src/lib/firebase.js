// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDnI7SoMriW9uaf3vhaxfAbIxdOa_IUh7A",
  authDomain: "react-chat-app-c9c38.firebaseapp.com",
  projectId: "react-chat-app-c9c38",
  storageBucket: "react-chat-app-c9c38.appspot.com",
  messagingSenderId: "409959379496",
  appId: "1:409959379496:web:8ab9e3bb69bcbdfe473b1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore();
export const storage = getStorage();
