// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8WXJr-RspM56Wf9DqDZUR8CpycNHUGRA",
  authDomain: "moviesreview-1fb29.firebaseapp.com",
  projectId: "moviesreview-1fb29",
  storageBucket: "moviesreview-1fb29.appspot.com",
  messagingSenderId: "277286676566",
  appId: "1:277286676566:web:14e83c776671f4f719f3f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");

export default app;
