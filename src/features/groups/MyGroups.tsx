// @ts-nocheck
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Space } from "antd";
import { Link } from "react-router-dom";
// models
import { Group } from "./redux/interfaces";
//utils
import { myGroupsFirestore } from "../../externalFeeds/firebase.utils";

// redux
import {
  selectors as groupSelector,
  actions as groupAction,
} from "@features/groups/redux";
import { getUserDetails } from "@features/login/redux/selectors";

// components
import { Styled } from "./MyGroups.styled";

const { Title, Text } = Typography;

const UsersGroups: FC = () => {
  const user = useSelector(getUserDetails);
  const groupsNotLoaded = useSelector(groupSelector.getRequestGroups);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupsNotLoaded, user]);

  useEffect(() => {
    setMyGroups(groups);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  console.log(myGroups);

  return (
    <div>
      {!myGroups && <div>Not part of any Groups.</div>}
      {myGroups && (
        <>
          {myGroups.map((group: Group) => (
            <Styled.Row justify={"space-between"} align={"top"} key={group.id}>
              <Styled.Col>
                <Title className="group-name">{group.name}</Title>
                <Text className="group-name">{group.description}</Text>
              </Styled.Col>
              <Space />
              <Styled.Col>
                <Link to={`/group/${group.id}`} className="action-btn">
                  See Group
                </Link>
              </Styled.Col>
            </Styled.Row>
          ))}
        </>
      )}
    </div>
  );
};

export default UsersGroups;
