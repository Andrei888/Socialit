import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";

// redux
import { userLogout } from "./redux/actions";

const LogoutBtn: React.FC = () => {
  const dispatch = useDispatch();

  const handleUserLogout = () => {
    dispatch(userLogout());
  };
  return <Button onClick={handleUserLogout}>Logout</Button>;
};

export default LogoutBtn;
