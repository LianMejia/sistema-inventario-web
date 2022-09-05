import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import 'firebase/compat/functions'
const firebaseConfig = {
    apiKey: "AIzaSyAUyuONeelAghTUJg1O1nN08sy8miX6cgA",
    authDomain: "sistema-inventario-abff5.firebaseapp.com",
    projectId: "sistema-inventario-abff5",
    storageBucket: "sistema-inventario-abff5.appspot.com",
    messagingSenderId: "216424473616",
    appId: "1:216424473616:web:7d7d63dd74339530915695",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const storage = firebase.storage()
const db = firebase.firestore()
const functions = firebase.functions()
export { db, auth, firebase, functions, storage } 