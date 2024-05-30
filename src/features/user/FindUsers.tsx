import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Input } from "antd";
// models
import { Friend } from "./redux/interfaces";
//utils
import {
  findUsersFirebase,
  addFriendFirestore,
  myFriendsFirestore,
} from "../../externalFeeds/firebase.utils";

// redux
import { actions as friendsActions } from "@app/features/user/redux";
import { getUserDetails } from "@features/login/redux/selectors";

import { Styled } from "./FindUsers.styled";

const { Title } = Typography;

interface FindUsersProps {
  title?: string;
  placeholder?: string;
  isFriend?: boolean;
}

const FindUsers: React.FC<FindUsersProps> = ({
  title,
  placeholder,
  isFriend = false,
}) => {
  const user = useSelector(getUserDetails);

  const [users, setUsers] = useState<Friend[] | null>(null);
  const [textQuery, setTextQuery] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    let foundUsers: Friend[] | null = [];
    if (event.target.value.length > 2) {
      if (isFriend) {
        // @ts-ignore
        foundUsers = await myFriendsFirestore(user, event.target.value);
      } else {
        // @ts-ignore
        foundUsers = await findUsersFirebase(
          event.target.value,
          user,
          isFriend
        );
      }
      console.log(foundUsers);
      setUsers(foundUsers);
    } else {
      setUsers(null);
    }
    setTextQuery(event.target.value ?? "");
  };
  const addFriendHandler = async (friendId: string) => {
    if (user && friendId) {
      const friends = await addFriendFirestore(user, friendId);
      if (friends) {
        dispatch(friendsActions.updateUserFriends());
      }
    }
  };

  return (
    <div>
      <Styled.Text>{title ?? "Find New Friends"}</Styled.Text>
      <div>
        <Input
          placeholder={placeholder ?? `find`}
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div>
        {!users && textQuery && textQuery?.length > 2 && (
          <Styled.Message>No Users Found!</Styled.Message>
        )}
        {!users && textQuery && textQuery?.length < 3 && (
          <Styled.Message>Please Type minimum 3 chars!</Styled.Message>
        )}
        {users &&
          users?.map((user) => {
            return (
              <Styled.Row
                justify={"space-between"}
                align={"middle"}
                key={user.id}
              >
                <Styled.Col>
                  <Title>{user.displayName}</Title>
                </Styled.Col>
                <Styled.Col>
                  <Button onClick={(e) => addFriendHandler(user.id)}>
                    Add friend
                  </Button>
                </Styled.Col>
              </Styled.Row>
            );
          })}
      </div>
    </div>
  );
};

export default FindUsers;
