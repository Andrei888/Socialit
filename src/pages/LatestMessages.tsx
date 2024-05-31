import React from "react";

import { updateUserFirebase } from "../externalFeeds/firebase.utils";
import { Button, Typography, Row, Col } from "antd";
import { useSelector } from "react-redux";

// redux
import { getUserBasic } from "@features/login/redux/selectors";

// components
import FindUsers from "@app/features/user/FindUsers";
import MyLatestMessages from "@features/messages/MyLatestMessages";

const { Title, Text } = Typography;

const LatestMessages: React.FC = () => {
  const user = useSelector(getUserBasic);
  return (
    <div className="friends-page">
      <Title>My Latest Messages</Title>
      <Row>
        <Col span={18}>
          <MyLatestMessages user={user} />
        </Col>
        <Col span={6}>
          <FindUsers title="Find My Friends" isFriend />
        </Col>
      </Row>
    </div>
  );
};

export default LatestMessages;
