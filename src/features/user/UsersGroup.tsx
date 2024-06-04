import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
// models
import { Friend } from "./redux/interfaces";
import { UserState } from "../login/redux/interfaces";
//utils
import {
  addFriendFirestore,
  updateUserFirebase,
} from "../../externalFeeds/firebase.utils";

// redux
import { actions as friendsActions } from "@app/features/user/redux";

// component
import GoToProfile from "./GoToProfile";
import GoToMessages from "./GoToMessages";
import { Styled } from "./UsersGroup.styled";

interface UsersGroupProps {
  user: UserState;
  friends: Friend[] | null;
  title?: string;
  noFriendsText: string;
  isAdmin?: boolean;
  handleCallback?: () => void;
}

const UsersGroup: FC<UsersGroupProps> = ({
  friends,
  user,
  title,
  noFriendsText,
  isAdmin,
  handleCallback,
}) => {
  console.log(friends);
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

  const disableEnableHandler = async (
    userId: string,
    toggleDisabled: boolean
  ) => {
    if (user && userId) {
      const updatedUser = await updateUserFirebase(
        { id: userId },
        { isDisabled: toggleDisabled }
      );
      console.log(updatedUser);
      if (updatedUser) {
        handleCallback && handleCallback();
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
            <Styled.Row
              justify={"space-between"}
              align={"middle"}
              key={friend.id}
            >
              <Styled.Col>
                <div>{friend.displayName}</div>
              </Styled.Col>
              <Styled.Col>
                {friend.isAccepted && friend.isVerified && (
                  <div>
                    <GoToProfile userId={friend.id} />
                    <GoToMessages myId={user.id} friendId={friend.id} />
                    {isAdmin && (
                      <Button
                        onClick={(e) =>
                          disableEnableHandler(friend.id, !friend.isDisabled)
                        }
                        style={{ marginLeft: "10px" }}
                      >
                        {friend.isDisabled ? "Enable User" : "Disable User"}
                      </Button>
                    )}
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

export default UsersGroup;
