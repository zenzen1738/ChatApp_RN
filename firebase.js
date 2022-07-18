import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTDTH4x0NoL3zx0uoYKQ8jIMiOAD_kMPE",
  authDomain: "chatapp-29b81.firebaseapp.com",
  projectId: "chatapp-29b81",
  storageBucket: "chatapp-29b81.appspot.com",
  messagingSenderId: "223935984967",
  appId: "1:223935984967:web:43b45c388ac65990878862",
};
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
  firebase
    .firestore()
    .settings({ experimentalForceLongPolling: true, merge: true });
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
