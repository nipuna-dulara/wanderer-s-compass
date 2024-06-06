// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDdMZcr4O7MQ7p06Z5I8rBO1KZT7IK6uOg",
    authDomain: "mora-canteens.firebaseapp.com",
    projectId: "mora-canteens",
    storageBucket: "mora-canteens.appspot.com",
    messagingSenderId: "395046013515",
    appId: "1:395046013515:web:6a6c818fe7c22ec1a49bce",
    measurementId: "G-X5F2XJKJC7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getFirestore, addDoc, collection, setDoc, doc } from "firebase/firestore";
export default function d() {
    const db = getFirestore(app)
    const handler = async () => {
        const docRef = await addDoc(collection(db, "Reviews"), {
            name: "Tokyo",
            country: "Japan"
        });
        console.log("Document written with ID: ", docRef.id);
    };
    return (

        <button onClick={handler} > click me </button>
    )

}