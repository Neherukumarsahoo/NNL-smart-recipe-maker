// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZiak1B9FcO53pDR4VoyrT3MMi1xCeoqk",
  authDomain: "nnl-project.firebaseapp.com",
  projectId: "nnl-project",
  storageBucket: "nnl-project.appspot.com", // ✅ FIXED
  messagingSenderId: "28927701959",
  appId: "1:28927701959:web:fb0aa2a76ec3519b841fe2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
