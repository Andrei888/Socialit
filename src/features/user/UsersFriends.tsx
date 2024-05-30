import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "antd";
// models
import { Friend } from "./redux/interfaces";
//utils
import { myFriendsFirestore } from "../../externalFeeds/firebase.utils";

// redux
import {
  selectors as friendsSelector,
  actions as friendsActions,
} from "@app/features/user/redux";
import { getUserDetails } from "@features/login/redux/selectors";

// component
import GoToMessages from "./GoToMessages";
import MyFriendsGroup from "./MyFriendsGroup";

const UsersFriends: FC = () => {
  const user = useSelector(getUserDetails);
  const friendsNotLoaded = useSelector(friendsSelector.getRequestFriends);
  const friends = useSelector(friendsSelector.getFriends);

  const friendsRequests = useSelector(friendsSelector.getFriendsRequests);

  const friendsRequested = useSelector(friendsSelector.getFriendsRequested);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchFriends() {
      try {
        const friends = await myFriendsFirestore(user);

        console.log(friends);

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
    <div>
      <MyFriendsGroup
        friends={friends}
        user={user}
        noFriendsText={"No friends found."}
      />
      <MyFriendsGroup
        friends={friendsRequests}
        user={user}
        title={"Friends Requested"}
        noFriendsText={"No requests sent."}
      />
      <MyFriendsGroup
        friends={friendsRequested}
        user={user}
        title={"Requests"}
        noFriendsText={"No new requests."}
      />
    </div>
  );
};

export default UsersFriends;
