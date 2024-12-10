import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyB90ml6js2W1uh7WN6LYmKZ2avCa_i4rqg",
    authDomain: "summative-acf4b.firebaseapp.com",
    projectId: "summative-acf4b",
    storageBucket: "summative-acf4b.firebasestorage.app",
    messagingSenderId: "1038627803565",
    appId: "1:1038627803565:web:6764cbd4763fd07ff49124"
};

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };