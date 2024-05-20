// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPKag7p0qR_3jurHLYK7urI8QyLfubIoI",
  authDomain: "moviesreview-project.firebaseapp.com",
  projectId: "moviesreview-project",
  storageBucket: "moviesreview-project.appspot.com",
  messagingSenderId: "881276370494",
  appId: "1:881276370494:web:f8136f66233d0448fa5b6f",
  measurementId: "G-Z137K67RPN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");

export default app;
