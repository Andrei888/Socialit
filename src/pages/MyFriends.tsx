import FindUsers from "@app/features/find/users/FindUsers";
import Users from "@app/features/find/users/Users";
import { Row, Col, Typography } from "antd";
import React from "react";
//constants
//import { ROUTES } from "../constants/routes";
//components
//redux

const { Title, Text } = Typography;

const MyFriends: React.FC = () => {
  return (
    <div className="friends-page">
      <Title>My Friends</Title>
      <Row>
        <Col span={18}>
          <Users />
        </Col>
        <Col span={6}>
          <Text>Find New Friends</Text>
          <FindUsers />
        </Col>
      </Row>
    </div>
  );
};

export default MyFriends;
