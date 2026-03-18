import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBk0AG5VyS2hG7lm5Ke2lyeNBjq1VrMVDQ",
  authDomain: "tokio-store.firebaseapp.com",
  projectId: "tokio-store",
  storageBucket: "tokio-store.firebasestorage.app",
  messagingSenderId: "294147600313",
  appId: "1:294147600313:web:a0b20bc7cb3c3b4df61068",
  measurementId: "G-NFTWFWTL15"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);