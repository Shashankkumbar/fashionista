import { initializeApp } from "firebase/app"; //must for setting up google sign in
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  Firestore,
  collection,
  WriteBatch,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDPi8N9AjOs9ZRPLG7fVMvboPEK8w8_inM",
  authDomain: "fashion-app-db-1514b.firebaseapp.com",
  projectId: "fashion-app-db-1514b",
  storageBucket: "fashion-app-db-1514b.appspot.com",
  messagingSenderId: "448660606747",
  appId: "1:448660606747:web:c128512ad56ba4ec9c0dbe",
};

const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

//Storage of data in firestore database of firebase
export const db = getFirestore(); //must to access firestore database in order to access,set or get data

//adding/setting collection of data into firestore database//below functionality is utilized in products context file to set data into firestore ONLY ONCE
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey); //reference to place where collection of data needs to be done (collectionKey is name/title of collection of data)
  const batch = writeBatch(db); //To make a successful transaction/write/transfer of data to firestore we use writeBatch method of firebase/firestore which we imported
  //Adding each of the object to firestore database by using docRef and CollectionRef
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase()); //reference to a place in database where collection of data are stored
    batch.set(docRef, object); //we need to write/set data to a referred place in database where value/data is individual object
  });

  await batch.commit();
  console.log("done");
};

//getting shop data from firestore database and below functionality is utilized in products context(refer data structure in firestore shopdata js file)
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef); //raise a query to get data at a collection reference

  const querySnapshot = await getDocs(q); //finally getting data in firestore(also refer shop-data.js is same data in firestore)
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data()); //now getCategoriesAndDocuments will give us back categories as an array
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid); //reference to a place in database where users are stored
  console.log(userDocRef); //reference to a place in database
  const userSnapShot = await getDoc(userDocRef); //to check whether data is present or not using the above reference
  console.log(userSnapShot); //to check whether data is present or not using the above reference
  console.log(userSnapShot.exists()); //to check whether data is present or not using the above reference

  //if user data does not exists
  //create/set the document with data from userAuth in my collection

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth; //userAuth is a user passed from signin component(sign with google user)
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  //if data exists
  //return userDocRef;
  return userSnapShot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback); //call back triggers when user authenticates in and authenticates out to take a note of user in contexts

//to check if the active user authenticated already(conversion from observable listener(onAuthStateChangedListener) to promise based fn call)
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe(); //close listener
        resolve(userAuth);
      },
      reject
    );
  });
};
