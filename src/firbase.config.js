import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDC6-LoVJthmOIMpFAsbf6XMKXRcIJwXWU",
  authDomain: "flinnapps.firebaseapp.com",
  databaseURL: "https://flinnapps-default-rtdb.firebaseio.com",
  projectId: "flinnapps",
  storageBucket: "flinnapps.appspot.com",
  messagingSenderId: "897486070631",
  appId: "1:897486070631:web:bed8e6879ff6bc4662c5c2",
  measurementId: "G-LH7RWHZ9R1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore(app);
const auth = getAuth(app);
export {db, storage, auth};