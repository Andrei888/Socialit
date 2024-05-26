import React from "react";
import { Row, Col, Typography } from "antd";
const { Title, Text } = Typography;

const Groups: React.FC = () => {
  return (
    <div className="friends-page">
      <Title>My Groups</Title>
      <Row>
        {/* <Col span={18}>
          <MyGroups />
        </Col>
        <Col span={6}>
          <Text>Find New Group</Text>
          <FindGroups />
        </Col> */}
      </Row>
    </div>
  );
};

export default Groups;
