import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Input } from "antd";
import { Link } from "react-router-dom";
// models
import { Group } from "./redux/interfaces";
//utils
import {
  updateUserFirebase,
  getUserDetailsFirebase,
  findGroupsFirebase,
  joinGroupFirebase,
} from "../../externalFeeds/firebase.utils";

// redux
import {
  selectors as groupSelector,
  actions as groupAction,
} from "@features/groups/redux";
import { getUserDetails } from "@features/login/redux/selectors";

// components
import { Styled } from "./FindGroups.styled";

const { Title } = Typography;

const FindGroups: FC = () => {
  const user = useSelector(getUserDetails);

  const [groups, setUsers] = useState<Group[] | null>(null);
  const [textQuery, setTextQuery] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    if (event.target.value.length > 2) {
      const foundUsers = await findGroupsFirebase(event.target.value);
      setUsers(foundUsers);
    } else {
      setUsers(null);
    }
    setTextQuery(event.target.value ?? "");
  };

  const addGroupHandler = async (groupId: string) => {
    if (user && groupId) {
      const updatedUser = await joinGroupFirebase(user, groupId);
      if (updatedUser) {
        dispatch(groupAction.updateGroupsList());
      }
    }
  };

  console.log(groups);

  return (
    <div>
      <div>
        <Input placeholder="search by name" onChange={(e) => handleSearch(e)} />
      </div>
      <div>
        {!groups?.length && textQuery && textQuery?.length > 2 && (
          <Styled.Message>No Groups Found!</Styled.Message>
        )}
        {!groups && textQuery && textQuery?.length < 3 && (
          <Styled.Message>Please Type minimum 3 characters!</Styled.Message>
        )}
        {groups &&
          groups?.map((group) => {
            return (
              <Styled.Row justify={"space-between"} align={"middle"}>
                <Styled.Col>
                  <Title>{group.name}</Title>
                </Styled.Col>
                <Styled.Col>
                  {group.users &&
                  group.users.find((groupUser) => groupUser.id === user.id) ? (
                    <Link to={`/group/${group.id}`}>See Group</Link>
                  ) : (
                    <Button onClick={(e) => addGroupHandler(group.id)}>
                      Join Group
                    </Button>
                  )}
                </Styled.Col>
              </Styled.Row>
            );
          })}
      </div>
    </div>
  );
};

export default FindGroups;
