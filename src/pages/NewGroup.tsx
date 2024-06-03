import React from "react";
import { Row, Col, Typography } from "antd";

// components
import CreateNewGroup from "@app/features/groups/CreateNewGroup";

const { Title } = Typography;

const Groups: React.FC = () => {
  return (
    <div className="new-group-page">
      <Title>Create New Group</Title>
      <Row>
        <Col span={16}>
          <CreateNewGroup />
        </Col>
      </Row>
    </div>
  );
};

export default Groups;
