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

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj); 
    });

    return await batch.commit();
  };

  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
      const { title, items } = doc.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    });

    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection; 
      return accumulator; 
    }, {});
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
     prompt: 'select_account'
  });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;

 


  

 