import { initializeApp } from "firebase/app";
import "dotenv/config";
import bcryptjs from "bcryptjs";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getAuth,
  //signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  // writeBatch,
  deleteDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_firebaseApiKey,
  authDomain: process.env.REACT_APP_firebaseAuthDomain,
  projectId: process.env.REACT_APP_firebaseProjectId,
  storageBucket: process.env.REACT_APP_firebaseStorageBucket,
  messagingSenderId: process.env.REACT_APP_firebaseMessagingSenderId,
  appId: process.env.REACT_APP_firebaseAppId,
  //measurementId: "XXX",
};

// Initialize Firebase
// @ts-ignore
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

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

  return {
    displayName: userSnapshot.data().displayName,
    avatar: userSnapshot.data().avatar,
    email: userSnapshot.data().email,
    id: userSnapshot.id,
    name: userSnapshot.data().name,
    age: userSnapshot.data().age,
    sex: userSnapshot.data().sex,
    isAdmin: userSnapshot.data().isAdmin,
    isProfilePublic: userSnapshot.data().isProfilePublic,
    address: userSnapshot.data().address,
  };
};

export const createUserFirebase = async (user) => {
  if (!user.email || !user.password) return;

  const encriptedPass = await bcryptjs.hash(user.password, 10);

  return await createUserWithEmailAndPassword(auth, user.email, encriptedPass);
};

export const signInUserWithEmailAndPassword = async (user) => {
  if (!user.email || !user.password) return;
  const encriptedPass = await bcryptjs.hash(user.password, 10);

  const response = await signInWithEmailAndPassword(
    auth,
    user.email,
    encriptedPass
  );
  if (response.user.uid) {
    const updatedUser = await getUserProfile(response.user.uid);
    return updatedUser;
  }
  return;
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
  console.log(db);
  console.log(user);
  const userDocRef = doc(db, "users", user.id);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

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
};

// get user profile

export const getUserProfile = async (userId) => {
  const userDocRef = doc(db, "users", userId);

  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    const oldUser = userSnapshot.data();
    console.log(oldUser);
    return {
      id: userId,
      name: oldUser.name,
      displayName: oldUser.displayName,
      email: oldUser.email,
      avatar: oldUser.avatar,
      age: oldUser.age,
      sex: oldUser.sex,
      description: oldUser.description,
      isAdmin: oldUser.isAdmin,
      isDisabled: oldUser.isDisabled,
    };
  }

  return null;
};

// upload to Firestore

export const addCollectionAndDocs = async (collectionKey, objectToAdd) => {
  // @ts-nocheck
  // const collectionRef = collection(db, collectionKey);
  // @ts-ignore
  //const batch = writeBatch(db);
};

// Find Users

export const findUsersFirebase = async (
  query,
  myUser,
  isFriend,
  friendsList = []
) => {
  console.log("friend", isFriend);
  const usersCol = collection(db, "users");

  const userSnapshot = await getDocs(usersCol);

  if (!userSnapshot.empty) {
    const user = userSnapshot.docs
      .map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
      .filter((user) => {
        const name = user.displayName?.toLowerCase();

        if (!isFriend) {
          return (
            user.id !== myUser.id &&
            name.includes(query.toLowerCase()) &&
            !friendsList.includes(user.id)
          );
        }

        return user.id !== myUser.id && name.includes(query.toLowerCase());
      })
      .filter((user) => {
        let isMyFriend = false;

        user.friends.forEach((friend) => {
          if (friend.friendId === user.id) {
            isMyFriend = true;
          }
        });

        return !isMyFriend;
      })
      .map((user) => ({
        displayName: user.displayName,
        id: user.id,
        email: user.email,
      }));

    return user;
  } else {
    return null;
  }
};

// find Friend

export const myFriendsFirestore = async (user, queryText, isFriend) => {
  const userDocRef = doc(db, "users", user.id);

  const userSnapshot = await getDoc(userDocRef);

  let usersList = [];

  if (userSnapshot.exists()) {
    const userFriends = userSnapshot.data().friends;
    if (userFriends && userFriends.length) {
      const userFriendsIds = userFriends.map((friend) => friend.friendId);
      const usersCol = collection(db, "users");

      const usersSnapshot = await getDocs(usersCol);

      if (queryText) {
        usersList = usersSnapshot.docs
          .filter((doc) => {
            return (
              userFriendsIds.includes(doc.id) &&
              doc
                .data()
                .displayName.toLowerCase()
                .includes(queryText.toLowerCase())
            );
          })
          .map((doc) => ({
            displayName: doc.data().displayName,
            id: user.id,
            email: doc.data().email,
          }));
      } else {
        usersList = usersSnapshot.docs
          .filter((doc) => {
            return userFriendsIds.includes(doc.id);
          })
          .map((doc) => {
            const findUserIndex = userFriends.findIndex(
              (friend) => friend.friendId === doc.id
            );
            return {
              ...userFriends[findUserIndex],
              displayName: doc.data().displayName,
              id: doc.id,
              email: doc.data().email,
            };
          });
      }
    }

    return usersList;
  }
};

// add Friend

const addFriendInList = (myFriendsList, friendId, prop) => {
  const indexFriendInList = myFriendsList?.findIndex((user) => {
    return user.friendId === friendId;
  });

  if (indexFriendInList !== undefined && indexFriendInList !== -1) {
    myFriendsList[indexFriendInList] = {
      ...myFriendsList[indexFriendInList],
      [prop]: true,
    };
  } else if (indexFriendInList !== undefined) {
    myFriendsList.push({
      friendId: friendId,
      isAccepted: false,
      isVerified: false,
      [prop]: true,
    });
  } else {
    myFriendsList = [
      {
        friendId: friendId,
        isAccepted: false,
        isVerified: false,
        [prop]: true,
      },
    ];
  }

  return myFriendsList;
};

export const addFriendFirestore = async (user, friendId) => {
  const userDocRef = doc(db, "users", user.id);

  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    const updatedAt = new Date();

    const oldUser = userSnapshot.data();

    const friendArr = addFriendInList(oldUser.friends, friendId, "isVerified");

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

    const friendDocRef = doc(db, "users", friendId);

    const friendSnapshot = await getDoc(friendDocRef);

    if (friendSnapshot.exists()) {
      const updatedAt = new Date();

      const oldFriend = friendSnapshot.data();

      const updatedFriend = {
        ...oldFriend,
        updatedAt,
        friends: addFriendInList(oldFriend.friends, user.id, "isAccepted"),
      };

      try {
        await setDoc(friendDocRef, updatedFriend);
      } catch (error) {
        console.log("error updating user doesnt exist!", error.message);
      }
    }

    return friendArr;
  }
};

// Get All Users

export const getAllUsersFirebase = async (myUser) => {
  if (!myUser.isAdmin) {
    return null;
  }

  const usersCol = collection(db, "users");

  const userSnapshot = await getDocs(usersCol);

  if (!userSnapshot.empty) {
    const users = userSnapshot.docs
      .map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
      .filter((user) => {
        return user.id !== myUser.id;
      })
      .map((user) => ({
        displayName: user.displayName,
        id: user.id,
        email: user.email,
        isAccepted: true,
        isVerified: true,
        isDisabled: user.isDisabled,
      }));

    return users;
  } else {
    return null;
  }
};
// Groups

// Find Groups

export const findGroupsFirebase = async (query, searchIn) => {
  const usersCol = collection(db, "groups");

  const userSnapshot = await getDocs(usersCol);

  if (!userSnapshot.empty) {
    const filteredGroups = userSnapshot.docs
      .map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
      .filter((group) => {
        if (searchIn === "description") {
          const groupDescription = group.description?.toLowerCase();

          return groupDescription.includes(query.toLowerCase());
        } else if (searchIn === "messages") {
          const groupChat = group.chat
            ?.map((message) => message.text.toLowerCase())
            .join("_")
            ?.toLowerCase();

          return groupChat?.includes(query.toLowerCase());
        } else {
          const groupName = group.name?.toLowerCase();

          return groupName.includes(query.toLowerCase());
        }
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
    users: [],
    author: user.displayName,
    authorId: user.id,
    description: newGroup.description,
    seo: newGroup.seo,
    name: newGroup.name,
    isDisabled: false,
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

// disable Groups

export const disableGroupFirestore = async (user, groupId, disabled) => {
  // check if group exists
  const group = doc(db, "groups", groupId);
  const groupSnapshot = await getDoc(group);

  // find if group already exists with same ID
  if (groupSnapshot.exists) {
    const updatedGroup = {
      ...groupSnapshot.data(),
      isDisabled: disabled,
    };
    try {
      if (
        !user.isAdmin &&
        !updatedGroup.isDisabled &&
        updatedGroup.authorId !== user.id
      ) {
        return false;
      }
      await setDoc(doc(db, "groups", groupId), updatedGroup);

      return true;
    } catch (error) {
      console.log("error creating new group!", error.message);
    }
  } else {
    return false;
  }

  return true;
};

// all Groups

export const allGroupsFirestore = async (user) => {
  if (!user.isAdmin) {
    return null;
  }

  const usersGroups = collection(db, "groups");

  const groupsSnapshot = await getDocs(usersGroups);

  const groupsList = groupsSnapshot.docs.map((doc) => ({
    name: doc.data().name,
    id: doc.id,
    usersInGroup: doc.data().users,
    description: doc.data().description,
  }));

  return groupsList;
};

// disable Groups

export const deleteGroupFirestore = async (user, groupId) => {
  if (!user.isAdmin) {
    return false;
  }
  // check if group exists
  const group = doc(db, "groups", groupId);
  const groupSnapshot = await getDoc(group);

  // find if group already exists with same ID
  if (groupSnapshot.exists) {
    try {
      await deleteDoc(group);
    } catch (error) {
      console.log(error);
    }
  } else {
    return false;
  }
};

// remove user from Groups

export const removeUserFromGroupFirestore = async (user, groupId, text) => {
  const group = doc(db, "groups", groupId);
  const groupSnapshot = await getDoc(group);

  // find if group exists
  if (groupSnapshot.exists) {
    const updatedGroup = {
      ...groupSnapshot.data(),
      users: groupSnapshot
        .data()
        .users.filter((userInGroup) => userInGroup.id !== user.id),
    };

    try {
      await setDoc(doc(db, "groups", groupId), updatedGroup);

      const userDocRef = doc(db, "users", user.id);

      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        // update User Groups
        const updatedAt = new Date();

        const oldUser = userSnapshot.data();

        if (oldUser.groups && oldUser.groups?.includes(groupId)) {
          const groupsArr = oldUser.groups.filter((group) => group !== groupId);

          const updatedUser = {
            ...oldUser,
            updatedAt,
            groups: groupsArr,
          };

          await setDoc(userDocRef, updatedUser);
          return true;
        }
      }
    } catch (error) {
      console.log("error creating new group!", error.message);
    }
  } else {
    return false;
  }

  return true;
};

// get user to user Messages

export const getUserToUserMessages = async (userId, friendId) => {
  const messagesIds = [userId + "-" + friendId, friendId + "-" + userId];

  const messagesCol = collection(db, "messages");
  const messagesSnapshot = await getDocs(messagesCol);

  if (!messagesSnapshot.exists) {
    const messages = messagesSnapshot.docs.find((doc) => {
      return messagesIds.includes(doc.id);
    });
    if (!messages) {
      return null;
    } else {
      return {
        userId: userId,
        firstUser: messages.data().firstUser,
        firstUserId: messages.data().firstUserId,
        secondUser: messages.data().secondUser,
        secondUserId: messages.data().secondUserId,
        messages: messages.data().messages,
      };
    }
  }
};

// update Conversation Firestore

export const updateConversationFirestore = async (
  user,
  friend,
  friendId,
  text,
  isFile = false,
  fileType = "",
  fileName = ""
) => {
  const messagesIds = [user.id + "-" + friendId, friendId + "-" + user.id];
  const msgId = Date.now().toString();
  // check if group already exist with same Id
  const messagesCol = collection(db, "messages");
  const messagesSnapshot = await getDocs(messagesCol);

  console.log(messagesSnapshot);
  if (!messagesSnapshot.empty) {
    const messages = messagesSnapshot.docs.find((doc) => {
      return messagesIds.includes(doc.id);
    });
    let messagesId = "";
    let updatedMessages = {};

    console.log(messages);

    if (messages && messages.exists) {
      messagesId = messages.id;
      updatedMessages = {
        ...messages.data(),
        messages: [
          ...(messages.data().messages ? messages.data().messages : []),
          {
            text: isFile ? null : text,
            userName: user.displayName,
            userId: user.id,
            msgId: msgId,
            file: isFile ? text : null,
            fileType: isFile ? fileType : null,
            fileName: isFile ? fileName : null,
          },
        ],
      };
    } else {
      messagesId = user.id + "-" + friendId;
      console.log(messagesId);
      updatedMessages = {
        firstUser: user.displayName,
        firstUserId: user.id,
        secondUser: friend,
        secondUserId: friendId,
        messages: [
          {
            text: isFile ? null : text,
            userName: user.displayName,
            userId: user.id,
            msgId: msgId,
            file: isFile ? text : null,
            fileType: isFile ? fileType : null,
            fileName: isFile ? fileName : null,
          },
        ],
      };
    }
    try {
      await setDoc(doc(db, "messages", messagesId), updatedMessages);
    } catch (error) {
      console.log("error adding new message!", error.message);
    }
  }

  return true;
};

// get user latest Messages

export const getUserLatestMessages = async (userId) => {
  const messagesCol = collection(db, "messages");
  const messagesSnapshot = await getDocs(messagesCol);

  if (!messagesSnapshot.empty) {
    const messages = messagesSnapshot.docs.filter((doc) => {
      return doc.id.includes(userId);
    });

    if (!messages) {
      return null;
    } else {
      const latestMessages = messages.map((doc) => {
        const chats = doc.data().messages;
        if (chats?.length) {
          const reversedMessages = chats
            .reverse()
            .filter((msg) => msg.userId !== userId && msg.text);
          if (reversedMessages?.length) {
            return reversedMessages[0];
          } else {
            return null;
          }
        }
        return null;
      });
      return latestMessages;
    }
  } else {
    return null;
  }
};

export const uploadFile = async (userId, file) => {
  const fileType = file.type;
  const storageRef = ref(storage, `${userId}/${file.name}`);

  // 'file' comes from the Blob or File API
  const storageDoc = await uploadBytes(storageRef, file);
  console.log(storageDoc);

  const url = await getDownloadURL(storageRef);

  return { url: url, type: fileType, name: file.name };
  //const mountainsRef = ref(storage, `images/${file.name}`);
  //console.log(mountainsRef);
};
