import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
  deleteDoc,
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

  //return userAuth;
  console.log(userSnapshot.id);
  console.log(userSnapshot.data());
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

  return await createUserWithEmailAndPassword(auth, user.email, user.password);
};

export const signInUserWithEmailAndPassword = async (user) => {
  if (!user.email || !user.password) return;

  const response = await signInWithEmailAndPassword(
    auth,
    user.email,
    user.password
  );
  console.log(response);
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
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);
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
    const test = userSnapshot.docs
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

export const myFriendsFirestore = async (user, queryText, isFriend) => {
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
        console.log(searchIn);
        if (searchIn === "description") {
          const groupDescription = group.description?.toLowerCase();

          return groupDescription.includes(query.toLowerCase());
        } else if (searchIn === "messages") {
          const groupChat = group.chat
            ?.map((message) => message.text.toLowerCase())
            .join("_")
            ?.toLowerCase();
          console.log(groupChat);

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

// disable Groups

export const disableGroupFirestore = async (user, groupId, disabled) => {
  // check if group exists
  const group = doc(db, "groups", groupId);
  const groupSnapshot = await getDoc(group);
  console.log(disabled);

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
  fileType = ""
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
            text: isFile ? null : text,
            userName: user.displayName,
            userId: user.id,
            msgId: msgId,
            file: isFile ? text : null,
            fileType: isFile ? fileType : null,
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

export const uploadFile = async (userId, file) => {
  const fileType = file.type;
  const storageRef = ref(storage, `${userId}/${file.name}`);

  // 'file' comes from the Blob or File API
  const storageDoc = await uploadBytes(storageRef, file);
  console.log(storageDoc);

  const url = await getDownloadURL(storageRef);

  return { url: url, type: fileType };
  //const mountainsRef = ref(storage, `images/${file.name}`);
  //console.log(mountainsRef);
};
