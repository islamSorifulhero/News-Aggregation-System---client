// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9rax3hZaEP-ZOeSywEX1W42zx0ylAKHQ",
  authDomain: "issues-4b478.firebaseapp.com",
  projectId: "issues-4b478",
  storageBucket: "issues-4b478.firebasestorage.app",
  messagingSenderId: "757897741095",
  appId: "1:757897741095:web:294730fa9a982ee30d5f02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);