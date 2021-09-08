import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyBuhsn_zcGoSlq4uEAwmoT21sDlFyp5L3o",
    authDomain: "dapp-77b3f.firebaseapp.com",
    projectId: "dapp-77b3f",
    storageBucket: "dapp-77b3f.appspot.com",
    messagingSenderId: "1028526071393",
    appId: "1:1028526071393:web:e348a419ad80ed21b49420"
}).auth();