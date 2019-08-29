import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyATzaVxDFBBlJyrVYC8TDxt1L4RNKwelDk",
    authDomain: "clothing-app-af56e.firebaseapp.com",
    databaseURL: "https://clothing-app-af56e.firebaseio.com",
    projectId: "clothing-app-af56e",
    storageBucket: "",
    messagingSenderId: "41242806768",
    appId: "1:41242806768:web:544a706e96805f4c"
  }; 

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
     prompt: 'select_account'
  });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  export default firebase;

 


  

 