const firebaseConfig = {
  apiKey: "AIzaSyDVB0HltG8ZLQ71un92ePiJte8N2XoD5WY",
  authDomain: "time-tracker-3c6fc.firebaseapp.com",
  projectId: "time-tracker-3c6fc",
  storageBucket: "time-tracker-3c6fc.firebasestorage.app",
  messagingSenderId: "972105444162",
  appId: "1:972105444162:web:17f9395c5c700fc55136db",
  measurementId: "G-D13S4YZC5K"
};

firebase.initializeApp(firebaseConfig); 
const auth = firebase.auth();
const db = firebase.firestore();