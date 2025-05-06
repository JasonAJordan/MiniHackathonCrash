// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, Firestore} from "firebase/firestore";
import { getAuth, Auth, GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realname-aaacc.firebaseapp.com",
  projectId: "realname-aaacc",
  storageBucket: "realname-aaacc.firebasestorage.app",
  messagingSenderId: "1032449014305",
  appId: "1:1032449014305:web:bb7b9e31f0305045d98160",
  measurementId: "G-GBR4WM8Q7V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth: Auth = getAuth(app);
export const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();

export const db: Firestore = getFirestore()