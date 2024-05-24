import React from "react";

import { updateUserFirebase } from "../externalFeeds/firebase.utils";
import { Button } from "antd";
import { useSelector } from "react-redux";

// redux
import { getUser } from "@features/login/redux/selectors";

// components
import ProfileForm from "@features/profile-edit/ProfileForm";

const Profile: React.FC = () => {
  const user = useSelector(getUser);
  const restInfo = {
    description: "test description",
  };
  const handleReset = () => {
    updateUserFirebase(user, restInfo);
  };
  return (
    <div className="profile-page">
      My Profile
      <ProfileForm />
      <div>
        <Button onClick={(e) => handleReset()}>Reset Profile</Button>
      </div>
    </div>
  );
};

export default Profile;
