import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "antd";
//import {PlusCircleOutlined} from  'antd/'
// models
import { Friend } from "./redux/interfaces";
//utils
import {
  updateUserFirebase,
  getUserDetailsFirebase,
  findUsersFirebase,
  addFriendFirestore,
} from "../../externalFeeds/firebase.utils";

// redux
import {
  selectors as friendsSelector,
  actions as friendsActions,
} from "@app/features/user/redux";
import { getUserDetails } from "@features/login/redux/selectors";
import Input from "antd/lib/input/Input";

const { Title } = Typography;

const FindUsers: FC = () => {
  const user = useSelector(getUserDetails);

  const [users, setUsers] = useState<Friend[] | null>(null);
  const [textQuery, setTextQuery] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    if (event.target.value.length > 2) {
      const foundUsers = await findUsersFirebase(event.target.value);
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
      <div>
        <Input placeholder="find" onChange={(e) => handleSearch(e)} />
      </div>
      <div>
        {!users && textQuery && textQuery?.length > 2 && <p>No Users Found!</p>}
        {!users && textQuery && textQuery?.length < 3 && (
          <p>Please Type minimum 3 chars!</p>
        )}
        {users &&
          users?.map((user) => {
            return (
              <div>
                <Title>testsd {user.displayName}</Title>
                <Button onClick={(e) => addFriendHandler(user.id)}>+++</Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FindUsers;
