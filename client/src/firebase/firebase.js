// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage  } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDLFE9Q1WGUNGyKVpoMmmE_T7Pzh5irVg",
  authDomain: "true-hood-e0d72.firebaseapp.com",
  projectId: "true-hood-e0d72",
  storageBucket: "true-hood-e0d72.appspot.com",
  messagingSenderId: "121955859979",
  appId: "1:121955859979:web:8148eff7a199db523a910e",
  measurementId: "G-JPEGE1N0W9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };