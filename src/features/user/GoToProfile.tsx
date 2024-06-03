import React from "react";
import { Link } from "react-router-dom";

interface GoToProfileProps {
  userId?: string | null;
}

const GoToProfile: React.FC<GoToProfileProps> = ({ userId }) => {
  if (userId) {
    return (
      <Link
        to={`/profile/${userId}`}
        className="action-btn"
        style={{ marginRight: "10px" }}
      >
        View profile
      </Link>
    );
  }
  return null;
};

export default GoToProfile;
