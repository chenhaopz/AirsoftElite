// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChTZsEh17S_yc2hA0RaEKubw-dGsJ5j28",
  authDomain: "airsoftelite.firebaseapp.com",
  projectId: "airsoftelite",
  storageBucket: "airsoftelite.firebasestorage.app",
  messagingSenderId: "377499109679",
  appId: "1:377499109679:web:57f39d19bdde3ed7adb9da"
};


// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
// get the firestore database object
export const db = getFirestore(firebase_app);