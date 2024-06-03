import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

// components
import UserProfileDetails from "@features/profile/UserProfileDetails";

const { Title } = Typography;

const UserProfile: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    const id = location.pathname.split("/").splice(-1)[0];
    if (id) {
      setUserId(id);
    }
  }, [location.pathname]);
  return (
    <div className="profile-page">
      <Title>User Profile</Title>
      <UserProfileDetails profileId={userId} />
    </div>
  );
};

export default UserProfile;
