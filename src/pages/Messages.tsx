import React, { useState, useEffect, ChangeEvent } from "react";
import { Typography, Row, Col, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
//models
import { FileObj } from "@models/file";
import { Friend } from "@app/features/user/redux/interfaces";
// utils
import {
  getUserToUserMessages,
  updateConversationFirestore,
  myFriendsFirestore,
  uploadFile,
} from "../externalFeeds/firebase.utils";
// redux
import { getUserDetails } from "@features/login/redux/selectors";
import {
  selectors as friendsSelector,
  actions as friendsActions,
} from "@app/features/user/redux";
import {
  selectors as messagesSelectors,
  actions as messagesAction,
} from "@features/messages/redux";
import MessagesBlock from "@app/features/messages/MessagesBlock";
import FilesBlock from "@app/features/messages/FilesBlock";

// components

const { Title } = Typography;

const Messages: React.FC = () => {
  const user = useSelector(getUserDetails);
  const [userId, setUserId] = useState<string>("");
  const [friendId, setFriendId] = useState<string>("");
  const [showOnlyFiles, setShowOnlyFiles] = useState<boolean>(false);
  const [files, setFriendFiles] = useState<FileObj[] | null>(null);

  const messagesState = useSelector(messagesSelectors.getMessagesState);
  const requestMessages = useSelector(messagesSelectors.requestMessages);
  const friendsNotLoaded = useSelector(friendsSelector.getRequestFriends);
  const myFriends = useSelector(friendsSelector.getFriends);

  const location = useLocation();

  const [fileUploaded, setFileUploaded] = useState<File | null>(null);

  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    const ids = location.pathname.split("/").splice(-1)[0].split("-");
    if (user.id && ids.length === 2 && ids.includes(user.id) && myFriends) {
      if (user.id === ids[0]) {
        setUserId(ids[0]);
        setFriendId(ids[1]);
      } else {
        setUserId(ids[1]);
        setFriendId(ids[0]);
      }
    }
  }, [location.pathname, user, myFriends]);

  const getFriendName = () => {
    return (
      myFriends?.find((friend) => friend.id === friendId)?.displayName ?? ""
    );
  };

  useEffect(() => {
    // get conversation
    async function getUserToUserMsg() {
      try {
        const chat = await getUserToUserMessages(userId, friendId);

        if (chat) {
          console.log(chat.messages);
          const getFiles: FileObj[] = chat.messages
            ?.filter((msg: any) => msg.fileType)
            .map((file: any) => {
              return {
                name: file.fileName,
                type: file.fileType,
                url: file.file,
              };
            });

          setFriendFiles(getFiles);

          dispatch(messagesAction.getUserMessagesSuccess(chat));
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (
      friendId &&
      userId &&
      !friendsNotLoaded &&
      (requestMessages || messagesState.friendId !== friendId)
    ) {
      getUserToUserMsg();
    }
  }, [
    friendId,
    userId,
    friendsNotLoaded,
    requestMessages,
    dispatch,
    messagesState.friendId,
  ]);

  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendText = () => {
    async function updateTextMsg(friendId: string) {
      try {
        const response = await updateConversationFirestore(
          user,
          getFriendName(),
          friendId,
          newMessage,
          false
        );
        if (response) {
          dispatch(messagesAction.updateUserMessages());
          setNewMessage("");
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (userId && friendId && newMessage) {
      updateTextMsg(friendId);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    console.log(e);
    if (e.keyCode === 13) {
      handleSendText();
    }
  };

  useEffect(() => {
    async function fetchFriends() {
      try {
        const friends = await myFriendsFirestore(user);

        if (friends) {
          dispatch(friendsActions.getUserFriends(friends as Friend[]));
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (friendsNotLoaded && user.id) {
      fetchFriends();
    }
  }, [friendsNotLoaded, user, dispatch]);

  // file functionality
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.files) {
      setFileUploaded(e.target.files[0]);
    }
  };
  const handleUpload = async () => {
    console.log(fileUploaded);
    // We will fill this out later
    const response = await uploadFile(user.id, fileUploaded);
    const { url, type, name } = response;
    handleSendFileToFirestore(url, type, name);
  };

  const handleSendFileToFirestore = (
    fileUrl: string,
    type: string,
    name: string
  ) => {
    async function updateTextMsg(friendId: string) {
      try {
        const response = await updateConversationFirestore(
          user,
          getFriendName(),
          friendId,
          fileUrl,
          true,
          type,
          name
        );
        if (response) {
          dispatch(messagesAction.updateUserMessages());
          setNewMessage("");
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (userId && friendId && fileUrl) {
      updateTextMsg(friendId);
    }
  };

  const handleSeeAllFiles = () => {
    setShowOnlyFiles((prev) => !prev);
  };

  return (
    <div className="friends-page">
      <Title>Messages with - {getFriendName()}</Title>
      {files && (
        <Row>
          <Button onClick={handleSeeAllFiles}>
            {showOnlyFiles ? "See Chat conversation" : "See all Files"}
          </Button>
        </Row>
      )}
      <Row>
        {showOnlyFiles ? (
          <FilesBlock files={files} />
        ) : (
          <Col span={18}>
            <MessagesBlock
              userId={userId}
              friendName={getFriendName()}
              messages={messagesState.messages}
              newMessage={newMessage}
              handleKeyUp={handleKeyUp}
              handleChangeText={handleChangeText}
              handleSendText={handleSendText}
              newFile={fileUploaded}
              handleFileChange={handleFileChange}
              handleFileUpload={handleUpload}
            />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Messages;
