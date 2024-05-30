import React, { useState, useEffect } from "react";

import { updateUserFirebase } from "../externalFeeds/firebase.utils";
import { Button, Typography, Row, Col } from "antd";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

// redux
import { getUser } from "@features/login/redux/selectors";

// components

const { Title, Text } = Typography;

const Messages: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [friendId, setFriendId] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const ids = location.pathname.split("/").splice(-1)[0].split("-");
    if (ids.length === 2) {
      setUserId(ids[0]);
      setFriendId(ids[1]);
    }
  }, [location.pathname]);

  useEffect(() => {
    // get conversation
  }, [friendId, userId]);

  return (
    <div className="friends-page">
      <Title>Messages With</Title>
      <Row>
        <Col span={18}>
          <Text>Messages Description</Text>
        </Col>
      </Row>
    </div>
  );
};

export default Messages;
