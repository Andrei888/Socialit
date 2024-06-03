import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image } from "antd";
// constants
import imageSrc from "../../images/default-avatar.jpg";
// utils
import { getUserProfile } from "@app/externalFeeds/firebase.utils";
// redux
import {
  selectors as profileSelectors,
  actions as profileActions,
} from "@features/profile/redux";

// components
import { Styled } from "./UserProfile.styled";

interface UserProfileProps {
  profileId: string | null;
}

const UserProfile: FC<UserProfileProps> = ({ profileId }) => {
  const userProfile = useSelector(profileSelectors.getUserProfile);

  const dispatch = useDispatch();

  useEffect(() => {
    // get conversation
    async function getLatestUserProfile() {
      try {
        const user = await getUserProfile(profileId);
        if (user) {
          dispatch(profileActions.getUserProfileSuccess(user));
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (profileId && userProfile.userId !== profileId) {
      getLatestUserProfile();
    }
  }, [profileId, userProfile.userId]);

  if (!profileId) {
    return null;
  }

  return (
    <div>
      <Row align="middle">
        <Col span={8}>
          <Styled.ImageWrapper>
            <Image
              src={userProfile.avatar || imageSrc}
              preview={false}
              alt="Avatar"
            />
          </Styled.ImageWrapper>
        </Col>
        <Col span={14}>
          <Row>
            <Col span={24}>User name: {userProfile.displayName}</Col>
          </Row>
          <Row>
            <Col span={24}>
              Sex:{" "}
              {userProfile.sex === "M"
                ? "Male"
                : userProfile.sex === "F"
                ? "Female"
                : "Unspecified"}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              User description: {userProfile.description ?? "No description."}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile;
