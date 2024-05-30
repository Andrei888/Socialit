import React from "react";
import { Link } from "react-router-dom";

interface GoToMessagesProps {
  myId?: string | null;
  friendId: string | null;
}

const GoToMessages: React.FC<GoToMessagesProps> = ({ myId, friendId }) => {
  console.log(myId);
  console.log(friendId);
  if (myId && friendId) {
    return <Link to={`/messages/${myId}-${friendId}`}>Send Message</Link>;
  }
  return null;
};

export default GoToMessages;
