import React, { useEffect, useState, ChangeEvent } from "react";
import { Row, Col, Typography, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
// models
import { BasicUser } from "@models/user";
import { Friend } from "@app/features/user/redux/interfaces";
//utils
import {
  getAllUsersFirebase,
  myFriendsFirestore,
} from "../externalFeeds/firebase.utils";
// redux
import { getUserDetails } from "@features/login/redux/selectors";
// components
import FindUsers from "@app/features/user/FindUsers";
import UsersFriends from "@app/features/user/UsersFriends";
import UsersGroup from "@app/features/user/UsersGroup";

const { Title, Text } = Typography;

const AllUsers: React.FC = () => {
  const user = useSelector(getUserDetails);
  const [users, setUsers] = useState<Friend[] | null>(null);
  const [filtredUsers, setFiltredUsers] = useState<Friend[] | null>(null);
  const [updateUsers, setUpdateUsers] = useState<boolean>(true);
  const [textQuery, setTextQuery] = useState<string>("");

  useEffect(() => {
    async function fetchFriends() {
      try {
        const allUsers = await getAllUsersFirebase(user);

        if (allUsers) {
          setUsers(allUsers);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (user.isAdmin) {
      fetchFriends();
    }
  }, [user.isAdmin, updateUsers]);

  useEffect(() => {
    setFiltredUsers(users);
  }, [users?.length]);

  const handleUpdateUsers = () => {
    setUpdateUsers((prev) => !prev);
  };
  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    setTextQuery(event.target.value);
  };
  useEffect(() => {
    const filtredList = users?.filter((user) =>
      user.displayName
        .toLocaleLowerCase()
        .includes(textQuery.toLocaleLowerCase())
    );
    setFiltredUsers(filtredList ?? []);
  }, [textQuery, users]);

  if (!user.isAdmin) {
    return null;
  }
  return (
    <div className="friends-page">
      <Title>All Users</Title>
      <Row>
        <Col span={18}>
          <div style={{ padding: "20px 20px 20px 0" }}>
            <Input
              value={textQuery}
              placeholder={`Filter User by Name`}
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <UsersGroup
            friends={filtredUsers as Friend[]}
            user={user}
            noFriendsText={"No Users found."}
            isAdmin={user.isAdmin}
            handleCallback={handleUpdateUsers}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AllUsers;
