import React from "react";
import { Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";
// components
import UsersGroups from "@features/groups/MyGroups";
import FindGroups from "@app/features/groups/FindGroups";

const { Title, Text } = Typography;

const MyGroups: React.FC = () => {
  return (
    <div className="friends-page">
      <Title>My Groups</Title>
      <Row>
        <Col span={16}>
          <UsersGroups />
        </Col>
        <Col span={8}>
          <Text>Find New Group</Text>
          <FindGroups />
          <Link className="" to="/new-group">
            Create New Group
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default MyGroups;