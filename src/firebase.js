// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCIkemTCHd6rBcId2_xG2N5SbrXZl64xec",
  authDomain: "instagram-clone-react-1c85a.firebaseapp.com",
  projectId: "instagram-clone-react-1c85a",
  storageBucket: "instagram-clone-react-1c85a.appspot.com",
  messagingSenderId: "698963895556",
  appId: "1:698963895556:web:ea8e13e239dc46ee145c51",
  measurementId: "G-3QN82CP9QN",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
export {db,auth,storage};