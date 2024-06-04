import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";

//utils
import { signOutUser } from "../../externalFeeds/firebase.utils";
// redux
import { userLogout } from "./redux/actions";

const LogoutBtn: React.FC = () => {
  const dispatch = useDispatch();

  const handleUserLogout = async () => {
    await signOutUser();
    dispatch(userLogout());
  };
  return <Button onClick={handleUserLogout}>Logout</Button>;
};

export default LogoutBtn;
