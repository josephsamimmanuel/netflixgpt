// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDj0tK6aW_rfYQXtT5AdkSLVSz_pe1dLs",
  authDomain: "netflixgpt-4036f.firebaseapp.com",
  projectId: "netflixgpt-4036f",
  storageBucket: "netflixgpt-4036f.firebasestorage.app",
  messagingSenderId: "819888387259",
  appId: "1:819888387259:web:a7ee499c1bc36bfab4259e",
  measurementId: "G-VCSK0G4ZSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

export { auth };