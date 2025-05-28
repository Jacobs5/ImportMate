import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWH0gn6EnRPgOQF_0W46fiWKZKa4lTabU",
  authDomain: "importchimp.firebaseapp.com",
  projectId: "importchimp",
  storageBucket: "importchimp.firebasestorage.app",
  messagingSenderId: "7169515922",
  appId: "1:7169515922:web:f33fd4baf5307b6417214b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
