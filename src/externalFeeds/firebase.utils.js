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
  getDocs,
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

// Find Users

export const findUsersFirebase = async (query) => {
  const usersCol = collection(db, "users");

  const userSnapshot = await getDocs(usersCol);

  if (!userSnapshot.empty) {
    const test = userSnapshot.docs
      .map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
      .filter((user) => {
        const name = user.displayName?.toLowerCase();

        return name.includes(query.toLowerCase());
      })
      .map((user) => ({
        displayName: user.displayName,
        id: user.id,
        email: user.email,
      }));

    return test;
  } else {
    return null;
  }
};

// find Friend

export const myFriendsFirestore = async (user) => {
  const userDocRef = doc(db, "users", user.id);

  const userSnapshot = await getDoc(userDocRef);

  let usersList = [];

  if (userSnapshot.exists()) {
    const userFriends = userSnapshot.data().friends;
    if (userFriends && userFriends.length) {
      const usersCol = collection(db, "users");

      const usersSnapshot = await getDocs(usersCol);

      usersList = usersSnapshot.docs
        .filter((doc) => {
          return userFriends.includes(doc.id);
        })
        .map((doc) => ({
          displayName: doc.data().displayName,
          id: user.id,
          email: doc.data().email,
        }));
    }

    return usersList;
  }
};

// add Friend

export const addFriendFirestore = async (user, friendId) => {
  const userDocRef = doc(db, "users", user.id);

  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    const updatedAt = new Date();

    const oldUser = userSnapshot.data();

    const friendArr = oldUser.friends
      ? [...oldUser.friends, friendId]
      : [friendId];

    const updatedUser = {
      ...oldUser,
      updatedAt,
      friends: friendArr,
    };

    try {
      await setDoc(userDocRef, updatedUser);
    } catch (error) {
      console.log("error updating user doesnt exist!", error.message);
    }

    return friendArr;
  }
};

// Groups

// Find Groups

export const findGroupsFirebase = async (query) => {
  const usersCol = collection(db, "groups");

  const userSnapshot = await getDocs(usersCol);

  if (!userSnapshot.empty) {
    const filteredGroups = userSnapshot.docs
      .map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
      .filter((group) => {
        const groupName = group.name?.toLowerCase();

        return groupName.includes(query.toLowerCase());
      })
      .map((group) => ({
        name: group.name,
        id: group.id,
        chat: group.chat,
        seo: group.seo,
        description: group.description,
        users: group.users,
      }));

    return filteredGroups;
  } else {
    return null;
  }
};

// join a Group

export const joinGroupFirebase = async (user, groupId) => {
  const userDocRef = doc(db, "users", user.id);

  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    // update User Groups
    const updatedAt = new Date();

    const oldUser = userSnapshot.data();

    if (oldUser.groups && oldUser.groups?.includes(groupId)) {
      console.log("User already part of this Group!");
      return null;
    }

    const groupsArr = oldUser.groups ? [...oldUser.groups, groupId] : [groupId];

    const updatedUser = {
      ...oldUser,
      updatedAt,
      groups: groupsArr,
    };

    try {
      await setDoc(userDocRef, updatedUser);
    } catch (error) {
      console.log("error updating user doesnt exist!", error.message);
    }

    // update Group's userList
    const groupDocRef = doc(db, "groups", groupId);

    const groupSnapshot = await getDoc(groupDocRef);

    if (groupSnapshot.exists()) {
      const group = groupSnapshot.data();

      const usersInGroupArr = group.users
        ? [
            ...group.users,
            {
              displayName: updatedUser.displayName,
              email: updatedUser.email,
              id: user.id,
            },
          ]
        : [
            {
              displayName: updatedUser.displayName,
              email: updatedUser.email,
              id: user.id,
            },
          ];

      const newGroup = { ...group, users: usersInGroupArr };
      console.log(newGroup);
      try {
        await setDoc(groupDocRef, newGroup);
      } catch (error) {
        console.log("error updating user doesnt exist!", error.message);
      }
    }

    return updatedUser;
  }
};

// my Groups

export const myGroupsFirestore = async (user) => {
  const userDocRef = doc(db, "users", user.id);

  const userSnapshot = await getDoc(userDocRef);

  let groupsList = [];

  if (userSnapshot.exists()) {
    const userGroups = userSnapshot.data().groups;
    if (userGroups && userGroups.length) {
      const usersGroups = collection(db, "groups");

      const groupsSnapshot = await getDocs(usersGroups);

      groupsList = groupsSnapshot.docs
        .filter((doc) => {
          return userGroups.includes(doc.id);
        })
        .map((doc) => ({
          name: doc.data().name,
          id: doc.id,
          usersInGroup: doc.data().users,
          description: doc.data().description,
        }));
    }

    return groupsList;
  }
};

// create new Groups

export const createNewGroupFirestore = async (user, newGroup) => {
  console.log(user);
  // check if group already exist with same Id
  const allGroups = collection(db, "groups");
  const groupsSnapshot = await getDocs(allGroups);

  // find if group already exists with same ID
  if (groupsSnapshot.exists) {
    const groupAlreadyExists = groupsSnapshot.docs.find((doc) => {
      return doc.id === newGroup.seo;
    });
    if (groupAlreadyExists) {
      return false;
    }
  }

  const createGroup = {
    users: [
      {
        displayName: user.displayName,
        email: user.email,
        id: user.id,
      },
    ],
    description: newGroup.description,
    seo: newGroup.seo,
    name: newGroup.name,
  };

  try {
    await setDoc(doc(db, "groups", newGroup.seo), createGroup);

    // join user to new created group
    await joinGroupFirebase(user, newGroup.seo);
  } catch (error) {
    console.log("error creating new group!", error.message);
  }

  return true;
};

// get Group Details

export const fetchGroupDetails = async (newGroupId) => {
  // check if group already exist with same Id
  const group = doc(db, "groups", newGroupId);
  const groupSnapshot = await getDoc(group);

  // find if group already exists with same ID
  if (groupSnapshot.exists) {
    console.log(groupSnapshot.data());
    return {
      ...groupSnapshot.data(),
      seo: groupSnapshot.data().seo ?? newGroupId,
    };
  } else {
    return null;
  }
};

// update Group Firestore

export const updateChatInGroupFirestore = async (user, groupId, text) => {
  console.log(user);
  // check if group already exist with same Id
  const group = doc(db, "groups", groupId);
  const groupSnapshot = await getDoc(group);

  // find if group already exists with same ID
  if (groupSnapshot.exists) {
    const msgId = Date.now().toString();
    const updatedGroup = {
      ...groupSnapshot.data(),
      chat: [
        ...(groupSnapshot.data().chat ? groupSnapshot.data().chat : []),
        {
          text: text,
          userName: user.displayName,
          userId: user.id,
          msgId: msgId,
        },
      ],
    };
    console.log(updatedGroup);
    try {
      await setDoc(doc(db, "groups", groupId), updatedGroup);
    } catch (error) {
      console.log("error creating new group!", error.message);
    }
  } else {
    return false;
  }

  return true;
};
