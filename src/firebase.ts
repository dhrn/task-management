import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const fallBackConfig = {
  apiKey: "AIzaSyDNOnDLReXbSAHH-J50z1px6YtpIFVwhj0",
  authDomain: "pesto-test.firebaseapp.com",
  projectId: "pesto-test",
  storageBucket: "pesto-test.appspot.com",
  messagingSenderId: "280831376182",
  appId: "1:280831376182:web:cfc032b584f76968bd5197",
  measurementId: "G-H2DPGBZTPZ",
};

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.AUTHDOMAIN,
  projectId: import.meta.env.PROJECTID,
  storageBucket: import.meta.env.STORAGEBUCKET,
  messagingSenderId: import.meta.env.MESSAGINGSENDERID,
  appId: import.meta.env.APPID,
  measurementId: import.meta.env.MEASUREMENTID,
};

// Initialize Firebase
export const app = initializeApp({ ...firebaseConfig, ...fallBackConfig }, );
export const db = getFirestore(app);
export const auth = getAuth(app);
