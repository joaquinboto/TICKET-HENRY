// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrgmFcmPhoqvHi49NwBvUi27eSRYJsN-U",
  authDomain: "pfauth-625c8.firebaseapp.com",
  projectId: "pfauth-625c8",
  storageBucket: "pfauth-625c8.appspot.com",
  messagingSenderId: "878216799280",
  appId: "1:878216799280:web:e63bf543502a1f48dab9f5",
  measurementId: "G-34GNBPQ14X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

