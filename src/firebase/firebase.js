// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0Pz0c3XMuZm8t7R4jKkriJn4zaIzc6WU",
  authDomain: "moviesreviewapp-99c47.firebaseapp.com",
  projectId: "moviesreviewapp-99c47",
  storageBucket: "moviesreviewapp-99c47.appspot.com",
  messagingSenderId: "600387637488",
  appId: "1:600387637488:web:4f90efc6d823e695447235",
  measurementId: "G-QQN26YCLSY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");

export default app;
