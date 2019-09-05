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

  /** asychronous request to create a user profile */
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
   
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

 


  

 