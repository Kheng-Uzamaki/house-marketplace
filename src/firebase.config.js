// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAr7SDHwKlpT1-Il2CD13S0ao1qcIIC1A",
  authDomain: "house-marketplace-app-76405.firebaseapp.com",
  projectId: "house-marketplace-app-76405",
  storageBucket: "house-marketplace-app-76405.appspot.com",
  messagingSenderId: "961953981595",
  appId: "1:961953981595:web:ee2d747f4d5abd22f4923e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
