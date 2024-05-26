import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "antd";
// models
import { Friend } from "./redux/interfaces";
//utils
import {
  updateUserFirebase,
  getUserDetailsFirebase,
  myFriendsFirestore,
} from "../../externalFeeds/firebase.utils";

// redux
import {
  selectors as friendsSelector,
  actions as friendsActions,
} from "@app/features/user/redux";
import { getUserDetails } from "@features/login/redux/selectors";

const UsersFriends: FC = () => {
  const user = useSelector(getUserDetails);
  const friendsNotLoaded = useSelector(friendsSelector.getRequestFriends);
  const friends = useSelector(friendsSelector.getFriends);

  const [myFriends, setMyFriends] = useState<Friend[] | null>(friends);

  const dispatch = useDispatch();

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
  }, [friendsNotLoaded, user]);

  useEffect(() => {
    setMyFriends(friends);
  }, [friends]);

  return (
    <div>
      {!myFriends && <div>No Friend Found.</div>}
      {myFriends && (
        <>
          {myFriends.map((friend: Friend) => (
            <Row>
              <Col>
                <div>{friend.displayName}</div>
              </Col>
              <Col>
                <Button>Message Friend</Button>
              </Col>
            </Row>
          ))}
        </>
      )}
    </div>
  );
};

export default UsersFriends;
