import React from "react";

import { updateUserFirebase } from "../externalFeeds/firebase.utils";
import { Button, Typography, Row, Col } from "antd";
import { useSelector } from "react-redux";

// redux
import { getUser } from "@features/login/redux/selectors";

// components

const { Title, Text } = Typography;

const Group: React.FC = () => {
  return (
    <div className="friends-page">
      <Title>Group Name</Title>
      <Row>
        <Col span={18}>
          <Text>Group Description</Text>
        </Col>
        <Col span={6}>
          <Text>Users in Group</Text>
        </Col>
      </Row>
    </div>
  );
};

export default Group;
