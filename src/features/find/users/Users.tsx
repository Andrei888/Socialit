import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// models
import { Friends } from "./redux/interfaces";
//utils
import {
  updateUserFirebase,
  getUserDetailsFirebase,
} from "../../../externalFeeds/firebase.utils";

// redux
import {
  selectors as friendsSelector,
  actions as friendsActions,
} from "@features/find/users/redux";
import { getUserDetails } from "@features/login/redux/selectors";

const Users: FC = () => {
  const user = useSelector(getUserDetails);
  const initialFriendsLoaded = useSelector(
    friendsSelector.getFriendsInitialRequest
  );
  const friends = useSelector(friendsSelector.getFriends);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchDetails() {
      try {
        const userDetails = await getUserDetailsFirebase(user);
        console.log(userDetails);
        if (userDetails) {
          dispatch(
            friendsActions.getUserFriends(userDetails.friends as Friends[])
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (!initialFriendsLoaded && user.id) {
      fetchDetails();
    }
  }, [initialFriendsLoaded]);
  return <div>{!friends && <div>No Friend Found.</div>}</div>;
};

export default Users;
