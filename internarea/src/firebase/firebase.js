// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDggY2IXkWHcC_CGEUkYLB9caNYD6uL6Gs",
    authDomain: "internarea-caa55.firebaseapp.com",
    projectId: "internarea-caa55",
    storageBucket: "internarea-caa55.firebasestorage.app",
    messagingSenderId: "422616014425",
    appId: "1:422616014425:web:c6691a61a86cf2951c1b48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };