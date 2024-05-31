import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Typography, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
// utils
import {
  updateUserFirebase,
  getUserToUserMessages,
  updateConversationFirestore,
  myFriendsFirestore,
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
import { Friend } from "@app/features/user/redux/interfaces";

// components

const { Title, Text } = Typography;

const Messages: React.FC = () => {
  const user = useSelector(getUserDetails);
  const [userId, setUserId] = useState<string>("");
  const [friendId, setFriendId] = useState<string>("");
  const messagesState = useSelector(messagesSelectors.getMessagesState);
  const requestMessages = useSelector(messagesSelectors.requestMessages);
  const friendsNotLoaded = useSelector(friendsSelector.getRequestFriends);
  const myFriends = useSelector(friendsSelector.getFriends);
  const location = useLocation();

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
        const messages = await getUserToUserMessages(userId, friendId);

        console.log(messages);

        if (messages) {
          dispatch(messagesAction.getUserMessagesSuccess(messages));
        }
      } catch (error) {
        console.log(error);
      }
    }
    console.log(friendsNotLoaded);

    if (
      friendId &&
      userId &&
      !friendsNotLoaded &&
      (requestMessages || messagesState.friendId !== friendId)
    ) {
      getUserToUserMsg();
    }
  }, [friendId, userId, friendsNotLoaded, requestMessages]);

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
          newMessage
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

  return (
    <div className="friends-page">
      <Title>Messages with - {getFriendName()}</Title>
      <Row>
        <Col span={18}>
          <MessagesBlock
            messages={messagesState.messages}
            newMessage={newMessage}
            handleKeyUp={handleKeyUp}
            handleChangeText={handleChangeText}
            handleSendText={handleSendText}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Messages;
