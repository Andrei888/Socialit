import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "antd";
// models
import { Friends } from "./redux/interfaces";
//utils
import {
  updateUserFirebase,
  getUserDetailsFirebase,
  findUsersFirebase,
} from "../../../externalFeeds/firebase.utils";

// redux
import {
  selectors as friendsSelector,
  actions as friendsActions,
} from "@features/find/users/redux";
import { getUserDetails } from "@features/login/redux/selectors";
import Input from "antd/lib/input/Input";

const { Title } = Typography;

const FindUsers: FC = () => {
  const user = useSelector(getUserDetails);

  const [users, setUsers] = useState<Friends[] | null>(null);

  // const initialFriendsLoaded = useSelector(
  //   friendsSelector.getFriendsInitialRequest
  // );
  // const friends = useSelector(friendsSelector.getFriends);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   async function fetchDetails() {
  //     try {
  //       const userDetails = await getUserDetailsFirebase(user);
  //       console.log(userDetails);
  //       if (userDetails) {
  //         dispatch(
  //           friendsActions.getUserFriends(userDetails.friends as Friends[])
  //         );
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   if (!initialFriendsLoaded && user.id) {
  //     fetchDetails();
  //   }
  // }, [initialFriendsLoaded]);

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    if (event.target.value.length > 2) {
      const foundUsers = await findUsersFirebase(event.target.value);
      console.log(foundUsers);
      setUsers(foundUsers);
    } else {
      setUsers(null);
    }
  };

  console.log(users);

  return (
    <div>
      <div>
        <Input placeholder="find" onChange={(e) => handleSearch(e)} />
      </div>
      <div>
        {!users && <p>No Users Found!</p>}
        {users?.map((user) => {
          return <Title>testsd {user.displayName}</Title>;
        })}
      </div>
    </div>
  );
};

export default FindUsers;
