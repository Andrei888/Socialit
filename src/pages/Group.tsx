import React from "react";

import { updateUserFirebase } from "../externalFeeds/firebase.utils";
import { Button, Typography, Row, Col } from "antd";
import { useSelector } from "react-redux";

// redux
import { getUser } from "@features/login/redux/selectors";

// components

import GroupDetails from "@features/group-details/GroupDetails";

const Group: React.FC = () => {
  return (
    <div className="group-details-page">
      <GroupDetails />
    </div>
  );
};

export default Group;
