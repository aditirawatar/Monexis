// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTobGYQXqiNAlmfvwEW6xtwRXVVOuadrE",
  authDomain: "monexis-6c648.firebaseapp.com",
  projectId: "monexis-6c648",
  storageBucket: "monexis-6c648.firebasestorage.app",
  messagingSenderId: "131323745771",
  appId: "1:131323745771:web:5db7ceef023b2d6d47b5ae",
  measurementId: "G-EY56XKG45J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export default app;