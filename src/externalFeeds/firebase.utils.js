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

export const findUsersFirebase = async (query, myUser, isFriend) => {
  console.log("friend", isFriend);
  const usersCol = collection(db, "users");

  const userSnapshot = await getDocs(usersCol);

  if (!userSnapshot.empty) {
    const test = userSnapshot.docs
      .map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
      .filter((user) => {
        const name = user.displayName?.toLowerCase();

        if (isFriend) {
          return (
            user.id !== myUser.id &&
            name.includes(query.toLowerCase()) &&
            myUser.friends.indludes(user.id)
          );
        }

        return user.id !== myUser.id && name.includes(query.toLowerCase());
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

export const myFriendsFirestore = async (user, queryText) => {
  const userDocRef = doc(db, "users", user.id);

  const userSnapshot = await getDoc(userDocRef);

  let usersList = [];

  console.log(user);
  console.log(queryText);

  if (userSnapshot.exists()) {
    const userFriends = userSnapshot.data().friends;
    if (userFriends && userFriends.length) {
      const userFriendsIds = userFriends.map((friend) => friend.friendId);
      const usersCol = collection(db, "users");

      const usersSnapshot = await getDocs(usersCol);

      console.log(userFriends);

      if (queryText) {
        usersList = usersSnapshot.docs
          .filter((doc) => {
            return (
              userFriendsIds.includes(doc.id) &&
              doc.data().displayName.includes(queryText)
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
    author: user.displayName,
    authorId: user.id,
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
  text
) => {
  const messagesIds = [user.id + "-" + friendId, friendId + "-" + user.id];
  const msgId = Date.now().toString();
  // check if group already exist with same Id
  // const group = doc(db, "groups", groupId);
  // const groupSnapshot = await getDoc(group);
  console.log(user);
  console.log(friend);
  console.log(friendId);

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
            text: text,
            userName: user.displayName,
            userId: user.id,
            msgId: msgId,
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
            text: text,
            userName: user.displayName,
            userId: user.id,
            msgId: msgId,
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

  console.log(messagesSnapshot);

  if (!messagesSnapshot.empty) {
    const messages = messagesSnapshot.docs.filter((doc) => {
      return doc.id.includes(userId);
    });
    console.log(messages);
    if (!messages) {
      return null;
    } else {
      const latestMessages = messages.map((doc) => {
        const messages = doc.data().messages;
        if (messages?.length) {
          const reversedMessages = messages
            .reverse()
            .filter((msg) => msg.userId !== userId);
          console.log(reversedMessages);

          if (reversedMessages?.length) {
            console.log(reversedMessages);
            return reversedMessages[0];
          } else {
            return null;
          }
        }
      });
      console.log(latestMessages);
      return latestMessages;
    }
  } else {
    return null;
  }
};
