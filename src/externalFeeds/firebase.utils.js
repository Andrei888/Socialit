import { initializeApp } from "firebase/app";
import {
  getAuth,
  //signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAdditionalUserInfo,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfCF3j0qt2rUqKnzK_et4bZa-ndz8tHmU",
  authDomain: "social-9bd87.firebaseapp.com",
  projectId: "social-9bd87",
  storageBucket: "social-9bd87.appspot.com",
  messagingSenderId: "148459129005",
  appId: "1:148459129005:web:b35ae64c71a6576a849e24",
  //measurementId: "G-9VCWQ5C77G",
};

// Initialize Firebase
// @ts-ignore
const firebaseApp = initializeApp(firebaseConfig);
console.log(firebaseApp);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
//export const signInWithGoogleRedirect = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userAuth;
};

export const createUserFirebase = async (user) => {
  if (!user.email || !user.password) return;

  return await createUserWithEmailAndPassword(auth, user.email, user.password);
};

export const signInUserWithEmailAndPassword = async (user) => {
  if (!user.email || !user.password) return;

  return await signInWithEmailAndPassword(auth, user.email, user.password);
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const getUserDetailsFirebase = async (user) => {
  console.log(user);
  const userDocRef = doc(db, "users", user.id);

  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    return null;
  }
};

// update user in Firestore

export const updateUserFirebase = async (user, additionalInfo = {}) => {
  const userDocRef = doc(db, "users", user.id);

  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    const updatedAt = new Date();

    const oldUser = userSnapshot.data();

    const updatedUser = {
      ...oldUser,
      updatedAt,
      ...additionalInfo,
      email: oldUser.email,
    };

    console.log(updatedUser);

    try {
      await setDoc(userDocRef, updatedUser);
    } catch (error) {
      console.log("error updating user doesnt exist!", error.message);
    }

    return updatedUser;
  }

  // const userDocRef = doc(db, "users", user.id);

  // const userSnapshot = await getDoc(userDocRef);

  // if (userSnapshot.exists()) {
  //   console.log(userSnapshot);
  //   try {
  //     // await setDoc(userDocRef, {
  //     //   displayName,
  //     //   email,
  //     //   createdAt,
  //     //   ...additionalInfo,
  //     // });
  //   } catch (error) {
  //     console.log("error creating user", error.message);
  //   }
  // } else {
  //   console.log("error editing user that does not exist");
  // }
};

// upload to Firestore

export const addCollectionAndDocs = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);
};
