import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1D5-z4ZijsX9fMtxzArZ_0_4lo5vImik",
  authDomain: "react-project-fa2d3.firebaseapp.com",
  projectId: "react-project-fa2d3",
  storageBucket: "react-project-fa2d3.appspot.com",
  messagingSenderId: "760848444153",
  appId: "1:760848444153:web:7b48ee06a2afcda1239028",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const db = getFirestore(app);
