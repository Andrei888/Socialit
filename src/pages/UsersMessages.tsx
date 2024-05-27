import React from "react";

import { updateUserFirebase } from "../externalFeeds/firebase.utils";
import { Button, Typography, Row, Col } from "antd";
import { useSelector } from "react-redux";

// redux
import { getUser } from "@features/login/redux/selectors";

// components

const { Title, Text } = Typography;

const UsersMessages: React.FC = () => {
  return (
    <div className="friends-page">
      <Title>Messages Name</Title>
      <Row>
        <Col span={18}>
          <Text>Messages Description</Text>
        </Col>
        <Col span={6}>
          <Text>Messages in Group</Text>
        </Col>
      </Row>
    </div>
  );
};

export default UsersMessages;
