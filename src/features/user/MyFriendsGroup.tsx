import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Typography } from "antd";
// models
import { Friend } from "./redux/interfaces";
import { UserState } from "../login/redux/interfaces";
//utils
import {
  myFriendsFirestore,
  addFriendFirestore,
} from "../../externalFeeds/firebase.utils";

// redux
import {
  selectors as friendsSelector,
  actions as friendsActions,
} from "@app/features/user/redux";
import { getUserDetails } from "@features/login/redux/selectors";

// component
import GoToProfile from "./GoToProfile";
import GoToMessages from "./GoToMessages";
import { Styled } from "./MyFriendsGroup.styled";

interface MyFriendsGroupProps {
  user: UserState;
  friends: Friend[] | null;
  title?: string;
  noFriendsText: string;
}

const MyFriendsGroup: FC<MyFriendsGroupProps> = ({
  friends,
  user,
  title,
  noFriendsText,
}) => {
  const [myFriends, setMyFriends] = useState<Friend[] | null>(friends);
  useEffect(() => {
    setMyFriends(friends);
  }, [friends]);

  const dispatch = useDispatch();

  const addFriendHandler = async (friendId: string) => {
    if (user && friendId) {
      const friends = await addFriendFirestore(user, friendId);
      if (friends) {
        dispatch(friendsActions.updateUserFriends());
      }
    }
  };

  return (
    <Styled.Wrapper>
      {title && <Styled.Title>{title}</Styled.Title>}

      {(!myFriends || !myFriends.length) && <div>{noFriendsText}</div>}
      {myFriends && (
        <>
          {myFriends.map((friend: Friend) => (
            <Styled.Row justify={"space-between"} align={"middle"}>
              <Styled.Col>
                <div>{friend.displayName}</div>
              </Styled.Col>
              <Styled.Col>
                {friend.isAccepted && friend.isVerified && (
                  <div>
                    <GoToProfile userId={friend.id} />
                    <GoToMessages myId={user.id} friendId={friend.id} />
                  </div>
                )}
                {friend.isAccepted && !friend.isVerified && (
                  <Button onClick={(e) => addFriendHandler(friend.id)}>
                    Accept Friend
                  </Button>
                )}
                {!friend.isAccepted && friend.isVerified && (
                  <div>Request Sent</div>
                )}
              </Styled.Col>
            </Styled.Row>
          ))}
        </>
      )}
    </Styled.Wrapper>
  );
};

export default MyFriendsGroup;
