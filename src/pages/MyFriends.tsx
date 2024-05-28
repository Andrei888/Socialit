import React from "react";
import { Row, Col, Typography } from "antd";
// components
import FindUsers from "@app/features/user/FindUsers";
import UsersFriends from "@app/features/user/UsersFriends";

const { Title, Text } = Typography;

const MyFriends: React.FC = () => {
  return (
    <div className="friends-page">
      <Title>My Friends</Title>
      <Row>
        <Col span={18}>
          <UsersFriends />
        </Col>
        <Col span={6}>
          <FindUsers />
        </Col>
      </Row>
    </div>
  );
};

export default MyFriends;
