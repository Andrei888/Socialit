import React from "react";
import { Typography } from "antd";

// components
import ProfileForm from "@features/profile-edit/ProfileForm";

const Profile: React.FC = () => {
  return (
    <div className="profile-page">
      <Typography.Title>My Profile</Typography.Title>
      <ProfileForm />
    </div>
  );
};

export default Profile;
