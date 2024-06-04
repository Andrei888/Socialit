// @ts-nocheck
import React from "react";
import { Row, Col, Typography } from "antd";
// components
import AllGroupsList from "@features/groups/AllGroups";

const { Title } = Typography;

const AllGroups: React.FC = () => {
  return (
    <div className="friends-page">
      <Title>All Groups</Title>
      <Row>
        <Col span={16}>
          <AllGroupsList />
        </Col>
      </Row>
    </div>
  );
};

export default AllGroups;
