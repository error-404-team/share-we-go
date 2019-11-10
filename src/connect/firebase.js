import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyBYlhJSaEBsfLWsb8tyPEoBnMdT-KvsFWA",
  authDomain: "share-we-go-project.firebaseapp.com",
  databaseURL: "https://share-we-go-project.firebaseio.com",
  projectId: "share-we-go-project",
  storageBucket: "share-we-go-project.appspot.com",
  messagingSenderId: "556361690304",
  appId: "1:556361690304:web:e67c6f6438f9e839d5d125",
  measurementId: "G-ZPWZWZ8G9G"


};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;