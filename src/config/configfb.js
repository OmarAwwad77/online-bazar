import firebase from 'firebase';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyA35wThMa07yaHxejB_1k8aGzIWZpNxAvE",
    authDomain: "onlinebazar-f1615.firebaseapp.com",
    databaseURL: "https://onlinebazar-f1615.firebaseio.com",
    projectId: "onlinebazar-f1615",
    storageBucket: "onlinebazar-f1615.appspot.com",
    messagingSenderId: "801088969195",
    appId: "1:801088969195:web:98d42ca7eadbc4bdd4e1ae",
    measurementId: "G-8Y3L2MCL0F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
