import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB60nXkugdSeHJudeKTa_SY7IF4WV5FRJ4",
  authDomain: "design-thinking-cb0bc.firebaseapp.com",
  projectId: "design-thinking-cb0bc",
  storageBucket: "design-thinking-cb0bc.firebasestorage.app",
  messagingSenderId: "144960036101",
  appId: "1:144960036101:web:96385130f22c604abc2b6c",
  measurementId: "G-G754H1ZLBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
