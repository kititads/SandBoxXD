import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDaaEGFzrCyAxPaW34Wye80z63edvzgha8",
  authDomain: "projectnewworld-b14b7.firebaseapp.com",
  projectId: "projectnewworld-b14b7",
  storageBucket: "projectnewworld-b14b7.appspot.com",
  messagingSenderId: "1030911868029",
  appId: "1:1030911868029:web:6e133a32ffab57b32ec514",
  measurementId: "G-DRSFP0QQLQ"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);


export default FirebaseApp;
