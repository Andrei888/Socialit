import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "antd";
// models
import { Group } from "./redux/interfaces";
//utils
import {
  updateUserFirebase,
  getUserDetailsFirebase,
  myFriendsFirestore,
  myGroupsFirestore,
} from "../../externalFeeds/firebase.utils";

// redux
import {
  selectors as groupSelector,
  actions as groupAction,
} from "@features/groups/redux";
import { getUserDetails } from "@features/login/redux/selectors";

const UsersGroups: FC = () => {
  const user = useSelector(getUserDetails);
  const groupsNotLoaded = useSelector(groupSelector.getRequestGroups);
  const loading = useSelector(groupSelector.isLoading);
  console.log(groupsNotLoaded);
  console.log(loading);
  const groups = useSelector(groupSelector.getGroups);

  const [myGroups, setMyGroups] = useState<Group[] | null>(groups);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchGroups() {
      try {
        const groups = await myGroupsFirestore(user);
        console.log(groups);
        if (groups) {
          dispatch(groupAction.getUserGroupsSuccess(groups as Group[]));
        }
      } catch (error) {
        console.log(error);
      }
    }
    console.log(groupsNotLoaded);
    if (groupsNotLoaded && user.id) {
      fetchGroups();
    }
  }, [groupsNotLoaded, user]);

  useEffect(() => {
    setMyGroups(groups);
  }, [groups]);

  return (
    <div>
      {!myGroups && <div>Not part of any Groups.</div>}
      {myGroups && (
        <>
          {myGroups.map((group: Group) => (
            <Row>
              <Col>
                <div>{group.name}</div>
              </Col>
              <Col>
                <Button>See Group</Button>
              </Col>
            </Row>
          ))}
        </>
      )}
    </div>
  );
};

export default UsersGroups;
