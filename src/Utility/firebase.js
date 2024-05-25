import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCdwE52-vqZPbcClAJTenKOeDxjf9qYm58",
  authDomain: "clone-6ef80.firebaseapp.com",
  projectId: "clone-6ef80",
  storageBucket: "clone-6ef80.appspot.com",
  messagingSenderId: "727851847660",
  appId: "1:727851847660:web:85585babb86644008f3ac9"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth= getAuth(app);
export const db= app.firestore();