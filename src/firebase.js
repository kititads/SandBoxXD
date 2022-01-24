import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCclUTU1dh6fRo5zjI_SxEGK6hB4kpQo8",
  authDomain: "equipmentdb-97b5d.firebaseapp.com",
  projectId: "equipmentdb-97b5d",
  storageBucket: "equipmentdb-97b5d.appspot.com",
  messagingSenderId: "799840315907",
  appId: "1:799840315907:web:f49d4c425ee9c542f73c36",
  measurementId: "G-4MZ8YQV6BM"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);


export default FirebaseApp;
