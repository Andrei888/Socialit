// @ts-nocheck
import { FC, useEffect, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Typography, Space, Input } from "antd";
import { Link } from "react-router-dom";
// models
import { Group } from "./redux/interfaces";
//utils
import {
  updateUserFirebase,
  getUserDetailsFirebase,
  myFriendsFirestore,
  myGroupsFirestore,
  allGroupsFirestore,
} from "../../externalFeeds/firebase.utils";

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

  const [groups, setGroups] = useState<Group[] | null>(null);
  const [filtredGroups, setFiltredGroups] = useState<Group[] | null>(null);
  const [textQuery, setTextQuery] = useState<string>("");

  useEffect(() => {
    async function fetchGroups() {
      try {
        const groups = await allGroupsFirestore(user);
        console.log(groups);
        if (groups) {
          setGroups(groups as Group[]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (user.isAdmin) {
      fetchGroups();
    }
  }, [user]);

  useEffect(() => {
    const groupList = groups?.filter((group) =>
      group.name.toLocaleLowerCase().includes(textQuery.toLocaleLowerCase())
    );
    setFiltredGroups(groupList ?? []);
  }, [groups, textQuery]);

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    setTextQuery(event.target.value);
  };

  return (
    <div>
      {!filtredGroups && <div>No Groups Found.</div>}
      {filtredGroups && (
        <div>
          <div style={{ padding: "20px 20px 20px 0" }}>
            <Input
              value={textQuery}
              placeholder={`Filter User by Group Name`}
              onChange={(e) => handleSearch(e)}
            />
          </div>
          {filtredGroups.map((group: Group) => (
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
        </div>
      )}
    </div>
  );
};

export default UsersGroups;
