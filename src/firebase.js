// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhS_CaK0kQunvNg_bmM2I8fpxbYycgYJU",
  authDomain: "micro2-latiendita.firebaseapp.com",
  projectId: "micro2-latiendita",
  storageBucket: "micro2-latiendita.appspot.com",
  messagingSenderId: "944969034787",
  appId: "1:944969034787:web:4ff4ea30b814a30e2fd596"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);