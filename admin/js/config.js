const firebaseConfig = {
    apiKey: "AIzaSyDgRy3M9SK1qr-xgezoQ1UjZySigBdz47M",
    authDomain: "trial-df41e.firebaseapp.com",
    projectId: "trial-df41e",
    storageBucket: "trial-df41e.appspot.com",
    messagingSenderId: "1039053544438",
    appId: "1:1039053544438:web:bbd974e8ace5976cce05d7"
  };
// Initialize Firebase
const app=firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// db.settings({timestampsInSnapshots: true});
const auth = firebase.auth(); 