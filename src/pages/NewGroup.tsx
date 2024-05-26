import React from "react";
import { Row, Col, Typography } from "antd";

// components
import CreateNewGroup from "@app/features/groups/CreateNewGroup";

const { Title, Text } = Typography;

const Groups: React.FC = () => {
  return (
    <div className="friends-page">
      <Title>Create New Groups</Title>
      <Row>
        <Col span={16}>
          <CreateNewGroup />
        </Col>
      </Row>
    </div>
  );
};

export default Groups;
