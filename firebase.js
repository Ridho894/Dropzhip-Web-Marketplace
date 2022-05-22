// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN2ENeBct4gTkFfheex-LpmIuB0xSxY-8",
  authDomain: "simple-ecommerce-ae135.firebaseapp.com",
  projectId: "simple-ecommerce-ae135",
  storageBucket: "simple-ecommerce-ae135.appspot.com",
  messagingSenderId: "235869097872",
  appId: "1:235869097872:web:8c84574967812f236c2d15",
};

// Initialize Firebase
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
